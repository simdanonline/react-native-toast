Here's the updated `README.md` that includes the new `hideAllToast` and `hideToast` functions:

```markdown
# React Native Toast

A customizable toast notification component for React Native. This library provides an easy way to display toast messages or custom components across your application. 

## Features

- Show default and custom toasts
- Support for different toast statuses (e.g., success, error)
- Automatically manages multiple toasts
- Customizable appearance and positioning
- Global toast function for easy use anywhere in the application
- Hide specific toasts or all toasts programmatically

## Installation

To install the package, use npm or yarn:

```sh
npm install @your-org/react-native-toast
```

or

```sh
yarn add @your-org/react-native-toast
```

## Usage

### 1. Wrap Your Application with `ToastProvider`

To use the toast notifications, you need to wrap your application with the `ToastProvider`. This ensures that the toast context is available throughout your app.

#### Example

```typescript
import React from 'react';
import { ToastProvider } from '@your-org/react-native-toast';

const App = () => {
  return (
    <ToastProvider>
      {/* Your app components */}
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
import { useToast } from '@your-org/react-native-toast';

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
import { showGlobalToast, setGlobalToast } from '@your-org/react-native-toast';

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
import { useToast } from '@your-org/react-native-toast';

const { hideAllToast, hideToast } = useToast();

// Hide all toasts
hideAllToast();

// Hide a specific toast by key
const toastKey = 'unique-toast-key'; // Replace with the actual toast key
hideToast(toastKey);
```

## Props

### `ToastProvider` Component

- Wraps the application to provide the toast context.

### `showToast` Method (from `useToast` hook and `showGlobalToast` function)

- `message` (string): The message to display in the toast.
- `content` (ReactNode): Custom content to display in the toast. If provided, `message` will be ignored.
- `duration` (number): Duration in milliseconds for which the toast should be visible. Default is `2000`.
- `containerStyle` (ViewStyle): Style for the toast container.
- `textStyle` (TextStyle): Style for the toast text.
- `position` ("bottom" | "top"): Position of the toast on the screen. Default is `"bottom"`.
- `status` ("default" | "success" | "error" | "warning" | "info"): Toast status to determine the background color.

### `hideToast` Method (from `useToast` hook)

- `key` (string): The unique key of the toast to hide.

### `hideAllToast` Method (from `useToast` hook)

- No parameters. Hides all currently visible toasts.

## Customization

You can customize the appearance of the toasts by modifying the `Toast` component styles or by passing custom styles through the `containerStyle` and `textStyle` props.

## Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) before submitting a pull request.

## License

MIT
```

This updated `README.md` provides comprehensive instructions on how to use the new `hideAllToast` and `hideToast` methods, ensuring users can manage their toast notifications more effectively.