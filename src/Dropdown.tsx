import React, { useState, useMemo, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList, 
  TextInput, 
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';

// Generic type for any data structure
type ItemType = string | number | Record<string, any>;

// Props with full TypeScript support
interface DropdownProps<T extends ItemType = ItemType> {
  data: T[];
  value?: T | T[] | null;
  onChange?: (value: T | T[] | null) => void;
  
  // Field extractors - can be keys or functions
  labelField?: T extends object ? keyof T | ((item: T) => string) : never;
  valueField?: T extends object ? keyof T | ((item: T) => any) : never;
  
  // UI options
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  
  // Features
  search?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  
  // Styling
  style?: ViewStyle;
  dropdownStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  
  // Custom rendering
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode;
}

// Platform detection
const isWeb = Platform.OS === 'web';

// Omni-platform position measurement that works everywhere
const measureElement = (
  ref: React.RefObject<TouchableOpacity>, 
  callback: (x: number, y: number, width: number, height: number) => void
) => {
  if (isWeb) {
    // Web platform: use getBoundingClientRect
    const element = ref.current as any;
    if (element?._nativeTag) {
      const node = document.querySelector(`[data-reactroot] [data-testid]`) || 
                   element._nativeTag;
      if (node && typeof node.getBoundingClientRect === 'function') {
        const rect = node.getBoundingClientRect();
        callback(rect.x, rect.y, rect.width, rect.height);
        return;
      }
    }
    // Fallback for web
    if (element && element.getBoundingClientRect) {
      const rect = element.getBoundingClientRect();
      callback(rect.x, rect.y, rect.width, rect.height);
    } else if (element?._nativeTag?.getBoundingClientRect) {
      const rect = element._nativeTag.getBoundingClientRect();
      callback(rect.x, rect.y, rect.width, rect.height);
    } else {
      // Last resort - estimate position
      callback(0, 100, 300, 40);
    }
  } else {
    // Native platforms: use measureInWindow
    ref.current?.measureInWindow(callback);
  }
};

function Dropdown<T extends ItemType = ItemType>({
  data = [],
  value,
  onChange,
  labelField,
  valueField,
  placeholder = 'Select',
  searchPlaceholder = 'Search...',
  noResultsText = 'No results',
  search = false,
  multiple = false,
  disabled = false,
  style,
  dropdownStyle,
  itemStyle,
  renderItem,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownPos, setDropdownPos] = useState({ top: 0, width: 0 });
  const triggerRef = useRef<TouchableOpacity>(null);
  
  // Generic extractors that work with any data type
  const extractLabel = useCallback((item: T): string => {
    if (typeof item === 'string' || typeof item === 'number') return String(item);
    if (typeof labelField === 'function') return labelField(item as T & object);
    if (labelField) return String((item as any)[labelField]);
    return String((item as any).label || item);
  }, [labelField]);
  
  const extractValue = useCallback((item: T): any => {
    if (typeof item === 'string' || typeof item === 'number') return item;
    if (typeof valueField === 'function') return valueField(item as T & object);
    if (valueField) return (item as any)[valueField];
    return (item as any).value ?? item;
  }, [valueField]);
  
  // Normalized selected values
  const selectedItems = useMemo((): T[] => {
    if (!value) return [];
    if (multiple) return Array.isArray(value) ? value : [value as T];
    return Array.isArray(value) ? value : [value as T];
  }, [value, multiple]);
  
  // Filtered data based on search
  const filteredData = useMemo(() => {
    if (!search || !searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(item => 
      extractLabel(item).toLowerCase().includes(query)
    );
  }, [data, search, searchQuery, extractLabel]);
  
  // Display text for trigger
  const displayText = useMemo(() => {
    const count = selectedItems.length;
    if (count === 0) return placeholder;
    if (count === 1) return extractLabel(selectedItems[0]);
    return `${count} selected`;
  }, [selectedItems, placeholder, extractLabel]);
  
  // Check if item is selected
  const isItemSelected = useCallback((item: T): boolean => {
    const itemValue = extractValue(item);
    return selectedItems.some(selected => 
      extractValue(selected) === itemValue
    );
  }, [selectedItems, extractValue]);
  
  // Handle selection
  const handleSelect = useCallback((item: T) => {
    if (disabled) return;
    
    if (multiple) {
      const newValue = isItemSelected(item)
        ? selectedItems.filter(s => extractValue(s) !== extractValue(item))
        : [...selectedItems, item];
      onChange?.(newValue as T[]);
    } else {
      onChange?.(item);
      setIsOpen(false);
    }
  }, [disabled, multiple, isItemSelected, selectedItems, extractValue, onChange]);
  
  // Handle opening - OMNI SOLUTION
  const handleOpen = useCallback(() => {
    if (disabled) return;
    
    // Use omni measurement function
    measureElement(triggerRef, (_, y, width, height) => {
      setDropdownPos({ top: y + height, width });
      setIsOpen(true);
    });
  }, [disabled]);
  
  // Render list item
  const renderListItem = ({ item }: { item: T }) => {
    const selected = isItemSelected(item);
    
    if (renderItem) {
      return (
        <TouchableOpacity onPress={() => handleSelect(item)}>
          {renderItem(item, selected)}
        </TouchableOpacity>
      );
    }
    
    return (
      <TouchableOpacity
        style={[styles.item, itemStyle, selected && styles.selectedItem]}
        onPress={() => handleSelect(item)}
      >
        <Text style={[styles.itemText, selected && styles.selectedText]}>
          {extractLabel(item)}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        ref={triggerRef}
        style={[styles.trigger, style, disabled && styles.disabled]}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.triggerText, !selectedItems.length && styles.placeholder]} numberOfLines={1}>
          {displayText}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      
      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[
            styles.dropdown,
            dropdownStyle,
            { top: dropdownPos.top, width: dropdownPos.width }
          ]}>
            {/* Search Input */}
            {search && (
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
              />
            )}
            
            {/* Items List */}
            <FlatList<T>
              data={filteredData}
              renderItem={renderListItem}
              keyExtractor={(item, index) => String(extractValue(item) ?? index)}
              contentContainerStyle={filteredData.length === 0 && styles.emptyContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>{noResultsText}</Text>
              }
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    minHeight: 44,
  },
  disabled: {
    opacity: 0.5,
  },
  triggerText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 16,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  selectedItem: {
    backgroundColor: '#f0f8ff',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    padding: 20,
    color: '#999',
    fontSize: 14,
  },
});

// Export with proper generic typing
export { Dropdown };
export type { DropdownProps, ItemType };