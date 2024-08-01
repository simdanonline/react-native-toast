
```markdown
# react-native-toast

A custom toast notification component for React Native (Android & iOS).

## Features

- Simple and easy to use
- Customizable duration, position, and styles
- Compatible with both Android and iOS

## Installation

To install the package, use npm or yarn:
```

```bash
npm install react-native-toast
```

or

```bash
yarn add react-native-toast
```

## Usage

### 1. Wrap your application with the `ToastProvider`

Wrap your main `App` component with the `ToastProvider` to provide the context to the entire application.

```javascript
// App.js
import React from 'react';
import { ToastProvider } from 'react-native-toast';
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

### 2. Use the `useToast` hook in any component to show a toast notification

You can use the `useToast` hook in any component to display a toast notification.

```javascript
// MainScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast';

const MainScreen = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Show Toast"
        onPress={() =>
          showToast({
            message: 'This is a custom toast notification!',
            duration: 3000,
            position: 'bottom', // or 'top'
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

### Customizing Toast

You can customize the toast notification's container and text styles by passing `containerStyle` and `textStyle` props.

```javascript
// CustomToastScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast';

const CustomToastScreen = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Show Custom Toast"
        onPress={() =>
          showToast({
            message: 'This is a custom styled toast!',
            duration: 3000,
            position: 'top',
            containerStyle: styles.customContainer,
            textStyle: styles.customText,
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

A custom hook to show toast notifications.

#### Returns

- `showToast`: A function to show a toast notification.

  - `message` (string): The message to display in the toast.
  - `duration` (number, optional): The duration for which the toast should be visible (in milliseconds). Default is `2000`.
  - `containerStyle` (ViewStyle, optional): Custom styles for the toast container.
  - `textStyle` (TextStyle, optional): Custom styles for the toast message text.
  - `position` ('bottom' | 'top', optional): The position of the toast on the screen. Default is `bottom`.

## Example

```javascript
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ToastProvider, useToast } from 'react-native-toast';

const App = () => {
  return (
    <ToastProvider>
      <MainScreen />
    </ToastProvider>
  );
};

const MainScreen = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Show Toast"
        onPress={() =>
          showToast({
            message: 'Hello, this is a toast message!',
            duration: 3000,
            position: 'bottom',
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

export default App;
```

## License

MIT © [Similoluwa Odeyemi](https://github.com/simdanonline)
