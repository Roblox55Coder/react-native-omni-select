# react-native-omni-select

A lightweight, omni-platform dropdown component for React Native that works everywhere - iOS, Android, and Web.

[![npm version](https://img.shields.io/npm/v/react-native-omni-select.svg)](https://www.npmjs.com/package/react-native-omni-select)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-native-omni-select)](https://bundlephobia.com/package/react-native-omni-select)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 📦 **< 10KB** - Tiny bundle size
- 🚀 **Zero dependencies** - No bloat
- 🌍 **Omni-platform** - Works on iOS, Android, Web, and SSR
- 📝 **TypeScript native** - Full type safety with generics
- 🎨 **Customizable** - Style it your way
- 🔍 **Searchable** - Built-in search/filter
- ✅ **Single & Multi-select** - Both modes in one component
- 🎯 **Simple API** - Just 5 essential props

## 📦 Installation

```bash
npm install react-native-omni-select
```

or with Yarn:

```bash
yarn add react-native-omni-select
```

## 🚀 Quick Start

```tsx
import { Dropdown } from 'react-native-omni-select';

const MyComponent = () => {
  const [value, setValue] = useState(null);
  
  const data = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  return (
    <Dropdown
      data={data}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit"
    />
  );
};
```

## 📚 Examples

Check out the complete examples in the repository:

- [**Basic Examples**](https://github.com/anivar/react-native-omni-select/blob/main/example/BasicExample.tsx) - Simple dropdown usage with strings and objects
- [**Multi-Select Examples**](https://github.com/anivar/react-native-omni-select/blob/main/example/MultiSelectExample.tsx) - Multiple selection with search
- [**Custom Type Examples**](https://github.com/anivar/react-native-omni-select/blob/main/example/CustomTypeExample.tsx) - TypeScript generics and custom rendering
- [**Complete App Example**](https://github.com/anivar/react-native-omni-select/blob/main/example/App.tsx) - Full featured example app
- [**Examples Documentation**](https://github.com/anivar/react-native-omni-select/tree/main/example) - How to run the examples

## 📖 Complete Usage Guide

### 1️⃣ Basic Usage

#### Simple String Array
```tsx
import { Dropdown } from 'react-native-omni-select';

const SimpleExample = () => {
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <Dropdown
      data={['Small', 'Medium', 'Large', 'Extra Large']}
      value={selected}
      onChange={setSelected}
      placeholder="Select size"
    />
  );
};
```

#### Object Array with Label/Value
```tsx
const ObjectExample = () => {
  const [selected, setSelected] = useState(null);
  
  const options = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
    { label: 'Ruby', value: 'rb' },
  ];
  
  return (
    <Dropdown
      data={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select language"
    />
  );
};
```

### 2️⃣ Multi-Select Mode

```tsx
const MultiSelectExample = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const categories = ['Electronics', 'Clothing', 'Books', 'Sports', 'Home', 'Toys'];
  
  return (
    <View>
      <Dropdown
        data={categories}
        value={selectedItems}
        onChange={setSelectedItems}
        multiple
        placeholder="Select categories"
      />
      
      {/* Display selected items */}
      {selectedItems.length > 0 && (
        <Text>Selected: {selectedItems.join(', ')}</Text>
      )}
    </View>
  );
};
```

### 3️⃣ Search/Filter Functionality

```tsx
const SearchableExample = () => {
  const [country, setCountry] = useState(null);
  
  const countries = [
    { label: 'United States', value: 'us', code: '+1' },
    { label: 'United Kingdom', value: 'uk', code: '+44' },
    { label: 'Canada', value: 'ca', code: '+1' },
    { label: 'Australia', value: 'au', code: '+61' },
    // ... more countries
  ];
  
  return (
    <Dropdown
      data={countries}
      value={country}
      onChange={setCountry}
      search
      searchPlaceholder="Search country..."
      placeholder="Select your country"
    />
  );
};
```

### 4️⃣ Custom Data Types with TypeScript

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const ProductSelector = () => {
  const [product, setProduct] = useState<Product | null>(null);
  
  const products: Product[] = [
    { id: '1', name: 'iPhone 15', price: 999, category: 'Electronics', inStock: true },
    { id: '2', name: 'MacBook Pro', price: 2499, category: 'Electronics', inStock: true },
    { id: '3', name: 'AirPods', price: 249, category: 'Audio', inStock: false },
  ];
  
  return (
    <Dropdown<Product>
      data={products}
      value={product}
      onChange={setProduct}
      labelField="name"
      valueField="id"
      placeholder="Select a product"
      renderItem={(item, isSelected) => (
        <View style={styles.productItem}>
          <Text style={isSelected && styles.selected}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
          {!item.inStock && <Text style={styles.outOfStock}>Out of Stock</Text>}
        </View>
      )}
    />
  );
};
```

### 5️⃣ Custom Rendering

```tsx
const CustomRenderExample = () => {
  const [user, setUser] = useState(null);
  
  const users = [
    { id: 1, name: 'John Doe', avatar: '👨', role: 'Admin' },
    { id: 2, name: 'Jane Smith', avatar: '👩', role: 'User' },
    { id: 3, name: 'Bob Johnson', avatar: '🧑', role: 'Moderator' },
  ];
  
  return (
    <Dropdown
      data={users}
      value={user}
      onChange={setUser}
      labelField="name"
      valueField="id"
      placeholder="Select user"
      renderItem={(user, isSelected) => (
        <View style={styles.userItem}>
          <Text style={styles.avatar}>{user.avatar}</Text>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, isSelected && styles.selected]}>
              {user.name}
            </Text>
            <Text style={styles.userRole}>{user.role}</Text>
          </View>
        </View>
      )}
    />
  );
};
```

### 6️⃣ Platform-Specific Usage

#### React Native (iOS/Android)
```tsx
import { Dropdown } from 'react-native-omni-select';

// Works out of the box on iOS and Android
const NativeExample = () => {
  const [value, setValue] = useState(null);
  
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={setValue}
      // Automatically uses native measurement on mobile
    />
  );
};
```

#### React Native Web
```tsx
import { Dropdown } from 'react-native-omni-select';

// Automatically detects web platform
const WebExample = () => {
  const [value, setValue] = useState(null);
  
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={setValue}
      style={styles.webDropdown}
      // Platform detection handled internally
    />
  );
};
```

#### Next.js (with SSR)
```tsx
import dynamic from 'next/dynamic';

// SSR-safe import
const Dropdown = dynamic(
  () => import('react-native-omni-select').then(mod => mod.Dropdown),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

const NextExample = () => {
  const [value, setValue] = useState(null);
  
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={setValue}
      // Safe for server-side rendering
    />
  );
};
```

### 7️⃣ Styling Examples

```tsx
const StyledExample = () => {
  return (
    <>
      {/* Custom trigger button style */}
      <Dropdown
        data={data}
        value={value}
        onChange={setValue}
        style={{
          backgroundColor: '#007AFF',
          borderRadius: 25,
          paddingHorizontal: 20,
          borderWidth: 0,
        }}
      />
      
      {/* Custom dropdown menu style */}
      <Dropdown
        data={data}
        value={value}
        onChange={setValue}
        dropdownStyle={{
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5,
        }}
      />
      
      {/* Custom item style */}
      <Dropdown
        data={data}
        value={value}
        onChange={setValue}
        itemStyle={{
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 0,
        }}
      />
    </>
  );
};
```

### 8️⃣ Advanced Use Cases

#### Form Integration
```tsx
const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: null,
    interests: [],
  });
  
  return (
    <View>
      <TextInput
        value={formData.name}
        onChangeText={(text) => setFormData({...formData, name: text})}
        placeholder="Name"
      />
      
      <Dropdown
        data={countries}
        value={formData.country}
        onChange={(country) => setFormData({...formData, country})}
        placeholder="Country"
      />
      
      <Dropdown
        data={interests}
        value={formData.interests}
        onChange={(interests) => setFormData({...formData, interests})}
        multiple
        search
        placeholder="Select interests"
      />
      
      <Button title="Submit" onPress={() => console.log(formData)} />
    </View>
  );
};
```

#### Dynamic Data Loading
```tsx
const DynamicDataExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  
  useEffect(() => {
    // Fetch data from API
    fetchOptions().then(options => {
      setData(options);
      setLoading(false);
    });
  }, []);
  
  if (loading) {
    return <ActivityIndicator />;
  }
  
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={setValue}
      placeholder="Select option"
    />
  );
};
```

## 🔧 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | Required | Array of items to display |
| `value` | `T \| T[] \| null` | `undefined` | Selected value(s) |
| `onChange` | `(value: T \| T[] \| null) => void` | `undefined` | Selection change handler |
| `placeholder` | `string` | `'Select'` | Placeholder text |
| `multiple` | `boolean` | `false` | Enable multi-select |
| `search` | `boolean` | `false` | Enable search/filter |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `disabled` | `boolean` | `false` | Disable the dropdown |
| `labelField` | `keyof T \| (item: T) => string` | `'label'` | Field/function for display text |
| `valueField` | `keyof T \| (item: T) => any` | `'value'` | Field/function for value |
| `renderItem` | `(item: T, isSelected: boolean) => ReactNode` | `undefined` | Custom item renderer |
| `style` | `ViewStyle` | `undefined` | Trigger button style |
| `dropdownStyle` | `ViewStyle` | `undefined` | Dropdown menu style |
| `itemStyle` | `ViewStyle` | `undefined` | Item container style |
| `noResultsText` | `string` | `'No results'` | Empty search results text |

## 💡 Tips & Best Practices

1. **Use TypeScript generics** for better type safety:
   ```tsx
   <Dropdown<MyDataType> data={data} ... />
   ```

2. **Memoize data arrays** to prevent unnecessary re-renders:
   ```tsx
   const data = useMemo(() => [...], [dependency]);
   ```

3. **Handle null values** properly:
   ```tsx
   onChange={(value) => {
     if (value) {
       // Handle selection
     }
   }}
   ```

4. **Optimize large lists** by implementing search:
   ```tsx
   <Dropdown data={largeArray} search searchPlaceholder="Type to filter..." />
   ```

## 🏗️ Project Structure

```
react-native-omni-select/
├── src/
│   ├── Dropdown.tsx         # Main component (200 lines)
│   ├── index.ts            # Exports
│   └── types.ts            # TypeScript definitions
├── example/                # Usage examples
│   ├── App.tsx            # Basic example
│   ├── NextExample.tsx    # Next.js example
│   └── WebExample.tsx     # React Native Web example
├── docs/                  # Additional documentation
└── package.json
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT © [Anivar Aravind](https://github.com/anivar)

## 🙏 Support

If you find this package useful, please ⭐ star it on [GitHub](https://github.com/anivar/react-native-omni-select)!

☕ [Buy me a coffee](https://www.buymeacoffee.com/anivar)

---

**Why react-native-omni-select?** Simple. It works everywhere, has zero dependencies, and is under 10KB. No complexity, just a dropdown that works.