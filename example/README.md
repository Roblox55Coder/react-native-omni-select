# React Native Omni Select Examples

This folder contains comprehensive examples demonstrating all features of react-native-omni-select.

## 📚 Example Files

### 1. App.tsx
Complete example app showcasing all dropdown features in a scrollable view.

### 2. BasicExample.tsx
- Simple string array dropdown
- Object array with label/value pairs
- Basic selection handling

### 3. MultiSelectExample.tsx
- Multi-select with string arrays
- Multi-select with search functionality
- Display of selected items

### 4. CustomTypeExample.tsx
- TypeScript generic types usage
- Custom data types (User, Product)
- Custom item rendering with renderItem
- Complex object handling

## 🚀 Running the Examples

### React Native

```bash
# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

### React Native Web

```bash
# Install dependencies
npm install

# Run web version
npm run web
```

### Next.js

```bash
# Create a Next.js app
npx create-next-app@latest my-app
cd my-app

# Install the package
npm install react-native-omni-select

# Copy example code and run
npm run dev
```

## 💡 Key Features Demonstrated

1. **Single Selection** - Basic dropdown functionality
2. **Multi-Selection** - Select multiple items
3. **Search/Filter** - Built-in search capability
4. **Custom Types** - Full TypeScript support with generics
5. **Custom Rendering** - Customize item appearance
6. **Platform Compatibility** - Works on iOS, Android, and Web

## 🎯 Usage Tips

### TypeScript Types
```tsx
// Explicitly type your dropdown for better IntelliSense
<Dropdown<MyCustomType>
  data={myData}
  value={selectedValue}
  onChange={setSelectedValue}
  labelField="name"
  valueField="id"
/>
```

### Performance
```tsx
// Use React.memo for list items
const MyItem = React.memo(({ item, isSelected }) => (
  <View>
    <Text>{item.label}</Text>
  </View>
));
```

### Styling
```tsx
// Customize appearance
<Dropdown
  style={{
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
  }}
  dropdownStyle={{
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  }}
/>
```

## 📱 Platform-Specific Notes

### iOS
- Works out of the box
- Supports iOS 11+

### Android
- Works out of the box
- Supports Android 5.0+

### Web
- Automatically uses web-compatible APIs
- No patches required
- Works with React Native Web

### Next.js
- Use dynamic import for SSR compatibility
- See Next.js example in main README

## 🔗 Links

- [Documentation](https://github.com/anivar/react-native-omni-select#readme)
- [NPM Package](https://www.npmjs.com/package/react-native-omni-select)
- [GitHub Repository](https://github.com/anivar/react-native-omni-select)