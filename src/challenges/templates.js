export const joy = {
  JS: {
    'index.js': `import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import Demo from './demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <CssVarsProvider>
    <Demo />
  </CssVarsProvider>
);`,
    'demo.js': `import * as React from 'react';
import Button from '@mui/joy/Button';

export default function BasicButtons() {
  return (
    <Button variant="plain">Plain</Button>
  );
}`,
  },
  TS: {
    'index.tsx': `import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import Demo from './demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <CssVarsProvider>
    <Demo />
  </CssVarsProvider>
);`,
    'demo.tsx': `import * as React from 'react';
import Button from '@mui/joy/Button';

export default function BasicButtons(): React.ReactElement {
  return (
    <Button variant="plain">Plain</Button>
  );
}`,
  },
}
