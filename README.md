# Rainbowify

Turn all your react text into rainbows 🌈

### Install

Install the npm package in your React app:

```bash
npm install @ahl389/react-rainbowify
```

### Usage
Import the package at the top of your React component:

```javascript
import rainbowify from '@ahl389/rainbowify';
```

Wrap the desired JSX in a call to `rainbowify()`:

```javascript
function App() {
  return (
		rainbowify(<><h1>Hello, and welcome to Rainbowify.</h1><p>Everything here is gay.</p></>) }
  );
}
```

If you don't want to use the default rainbow colors, you can pass an array of hex codes to be used instead as a second argument. If you use a custom color array, there's no limit on the number of colors you can add, but you must use valid hex codes: '#800080'

```javascript
function App() {
  const customColors = ['#800080', '#000080', '#FF00FF'];

  return (
    rainbowify(<><h1>Hello, and welcome to Rainbowify.</h1><p>Everything here is gay.</p></>, customColors) }
  );
}
```

Have fun!