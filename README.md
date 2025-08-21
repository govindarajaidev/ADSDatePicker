# ADSDatePicker

A customizable React date picker component built with Ant Design, offering segmented period selection (day, week, month, quarter, year) and flexible data handling.

## Features

- **Segmented Period Selection**: Easily switch between day, week, month, quarter, and year views
- **Minimal UI**: Clean interface with just a calendar icon button
- **URL Parameter Integration**: Optionally update URL with selected date information
- **Callback Function Support**: Get period data through a callback function
- **Immutable State Management**: Built with Immer for predictable state updates
- **Customizable Theming**: Based on Ant Design with custom styling options
- **TypeScript Support**: Fully typed component and props

## Installation

```bash
npm install ads-date-picker
# or
yarn add ads-date-picker
```

## Usage

### Basic Usage

```tsx
import { useState } from "react";
import ADSDatePicker from "ads-date-picker";
import type { ADSPeriodType, ADSPeriodData } from "ads-date-picker";

const App: React.FC = () => {
  const [periodType, setPeriodType] = useState<ADSPeriodType>("month");
  const [periodDate, setPeriodDate] = useState<string | "">("");

  const handleDateSelection = (data: ADSPeriodData) => {
    console.log("Selected Period Data:", data);
    setPeriodType(data.periodType);
    setPeriodDate(data.date || "");
  };

  return (
    <ADSDatePicker
      periodType={periodType}
      periodDate={periodDate || undefined}
      periodCBUrl={false}
      periodCBFn={handleDateSelection}
    />
  );
};
```

### With URL Parameter Integration

```tsx
import ADSDatePicker from "ads-date-picker";

const App: React.FC = () => {
  return (
    <ADSDatePicker
      periodType="month"
      periodCBUrl={true}
    />
  );
};
```

## Props

| Prop          | Type                                                 | Default    | Description                                                         |
| ------------- | ---------------------------------------------------- | ---------- | ------------------------------------------------------------------- |
| `periodType`  | `"date" \| "week" \| "month" \| "quarter" \| "year"` | `"month"`  | The initial period type to display                                  |
| `periodDate`  | `string \| ""`                                       | `null`     | The initial selected date (ISO string format)                       |
| `periodCBFn`  | `(data: ADSPeriodData) => void`                      | `() => {}` | Callback function that receives period data when a date is selected |
| `periodCBUrl` | `boolean`                                            | `true`     | Whether to update URL parameters with selected period data          |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build the library
npm run build:lib
```

## Publishing to npm

To publish this package to npm:

1. Make sure you're logged in to npm:

   ```bash
   npm login
   ```

2. Update the version in `package.json` or use the publish script which will prompt for a version:

3. Run the publish script:

   ```bash
   # On Windows
   .\publish.bat

   # On macOS/Linux
   bash publish.sh
   ```

4. Or manually publish:

   ```bash
   # Build the library
   npm run build:lib

   # Publish to npm
   npm publish
   ```

## License

MIT
