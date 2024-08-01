# @simdanonline/react-native-toast

A custom toast notification component for React Native (Android & iOS).

## Features

- Simple and easy to use
- Customisable appearance, duration, position, and styles
- Compatible with both Android and iOS
- Allows passing custom components
- Global toast function for easy use anywhere in the application
- Hide specific toasts or all toasts programmatically


## Installation

To install the package, use npm or yarn:

```bash
npm install @simdanonline/react-native-toast
```

or

```bash
yarn add @simdanonline/react-native-toast
```

## Usage

### 1. Wrap your application with the `ToastProvider`

Wrap your main `App` component with the `ToastProvider` to provide the context to the entire application.

```javascript
// App.js
import React from 'react';
import { ToastProvider } from '@simdanonline/react-native-toast';
import MainScreen from './MainScreen';

const App = () => {
  return (
    <ToastProvider>
      <MainScreen />
    </ToastProvider>
  );
};

export default App;
```

### 2. Displaying Toasts

#### Using the Hook

To display a toast from within a React component, use the `useToast` hook provided by the library.

#### Example

```typescript
import React from 'react';
import { Button, View } from 'react-native';
import { useToast } from '@simdanonline/react-native-toast';

const MyComponent = () => {
  const { showToast, hideAllToast, hideToast } = useToast();
  const [toastOneId, setToastOneId] = useState();

  return (
    <View>
      <Button
        title="Show Toast Message"
        onPress={() =>
          const id = showToast({
            message: 'This is a toast message!',
            duration: 3000,
            position: 'bottom',
          })
          setToastOneId(id);
        }
      />
      <Button
        title="Show Custom Toast"
        onPress={() =>
          showToast({
            content: (
              <View>
                <Text style={{ color: 'yellow', fontSize: 16 }}>This is a custom toast!</Text>
              </View>
            ),
            duration: 3000,
            position: 'top',
          })
        }
      />
      
      <Button
        title="Hide Toast One"
        onPress={() => {
          hideToast(toastOneId);
        }}
      />
      <Button
        title="Hide All Toasts"
        onPress={() => hideAllToast()}
      />
    </View>
  );
};

export default MyComponent;
```


### 3. Global Toast Function

You can use the global `showGlobalToast` function to display toasts from outside React components, such as in non-React utility functions or services.

#### Setup

Make sure that `ToastProvider` is used in your application to initialize the global toast function automatically.

#### Example Usage

```typescript
import { showGlobalToast, setGlobalToast } from '@simdanonline/react-native-toast';

// Call the global toast function from anywhere
showGlobalToast({
  message: 'This is a global toast!',
  duration: 3000,
  position: 'bottom',
});

// Optionally, you can manually set the global toast function if needed
// setGlobalToast(yourCustomShowToastFunction);
```

### 4. Hiding Toasts

You can programmatically hide toasts using the `hideToast` and `hideAllToast` methods.

#### Example Usage

```typescript
import { useToast } from '@simdanonline/react-native-toast';

const { hideAllToast, hideToast } = useToast();

// Hide all toasts
hideAllToast();

// Hide a specific toast by key
const toastKey = 'unique-toast-key'; // Replace with the actual toast key
hideToast(toastKey);
```

### Customizing Toast

You can customize the toast notification's container and text styles by passing `containerStyle` and `textStyle` props.

```javascript
// CustomToastScreen.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useToast } from '@simdanonline/react-native-toast';

const CustomToastScreen = () => {
  const { showToast, hideAllToast } = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Show Custom Toast"
        onPress={() =>
          showToast({
            content: (
              <View>
                <Text style={{ color: 'yellow', fontSize: 16 }}>This is a custom toast!</Text>
              </View>
            ),
            duration: 3000,
            position: 'top',
            containerStyle: styles.customContainer,
            textStyle: styles.customText,
            status: 'warning',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customContainer: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
  },
  customText: {
    color: 'yellow',
    fontSize: 16,
  },
});

export default CustomToastScreen;
```

## API

### `ToastProvider`

A context provider component that should wrap your application to provide toast functionality.

#### Props

- `children`: The components that will have access to the toast context.

### `useToast`

A hook that returns the `showToast`, `hideToast`, `hideAllToast` functions.

- #### `showToast`

Function to show a toast notification.

- #### `hideToast`

Function to hide a toast notification, using toast unique key.

- #### `hideAllToast`

Function to hide all toast notifications.

### Props

| Prop           | Type           | Default  | Description                                                    |
| -------------- | -------------- | -------- | -------------------------------------------------------------- |
| `message`      | `string`       | `null`   | The message to display in the toast.                           |
| `content`      | `ReactNode`    | `null`   | Custom content to display in the toast.                        |
| `duration`     | `number`       | `2000`   | Duration for which the toast is visible.                       |
| `containerStyle` | `ViewStyle`  | `null`   | Custom styles for the toast container.                         |
| `textStyle`    | `TextStyle`    | `null`   | Custom styles for the toast message.                           |
| `position`     | `'bottom' \| 'top'` | `'bottom'` | Position of the toast on the screen.                           |
| `status`       | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'` | `'default'` | Status type of the toast for different background colors.  

##### Example

```javascript
// MainScreen.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useToast } from '@simdanonline/react-native-toast';

const MainScreen = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Show Toast Message"
        onPress={() =>
          showToast({
            message: 'This is a toast message!',
            duration: 3000,
            position: 'bottom',
          })
        }
      />
      <Button
        title="Show Custom Toast"
        onPress={() =>
          showToast({
            content: (
              <View>
                <Text style={{ color: 'yellow', fontSize: 16 }}>This is a custom toast!</Text>
              </View>
            ),
            duration: 3000,
            position: 'top',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
```

## License

MIT © [Similoluwa Odeyemi](https://github.com/simdanonline)