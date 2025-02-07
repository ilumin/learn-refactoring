import React from 'react'
import LZString from 'lz-string'
import Highlight, { defaultProps } from 'prism-react-renderer'
import getDemoConfig from './deprecated/getDemoConfig'

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, '') // Remove ending '='
}

function addHiddenInput(form, name, value) {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = name
  input.value = value
  form.appendChild(input)
}

const jsCode = `import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}`

const tsCode = `import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(): React.ReactElement {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}`

const CODE = {
  JS: jsCode,
  TS: tsCode,
}

function App() {
  const [codeVariant, setCodeVariant] = React.useState('JS')
  const demoData = {
    title: 'A demo',
    githubLocation: '',
    language: 'en',
    codeVariant,
    raw: CODE[codeVariant],
  }
  const handleCodeSandboxClick = () => {
    const demoConfig = getDemoConfig(demoData)
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            name: demoConfig.title,
            description: demoConfig.description,
            dependencies: demoConfig.dependencies,
            devDependencies: {
              'react-scripts': 'latest',
              ...demoConfig.devDependencies,
            },
            main: demoConfig.main,
            scripts: demoConfig.scripts,
            // We used `title` previously but only inference from `name` is documented.
            // TODO revisit once https://github.com/codesandbox/codesandbox-client/issues/4983 is resolved.
            title: demoConfig.title,
          },
        },
        ...Object.keys(demoConfig.files).reduce((files, name) => {
          files[name] = { content: demoConfig.files[name] }
          return files
        }, {}),
      },
    })

    const form = document.createElement('form')
    form.method = 'POST'
    form.target = '_blank'
    form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
    addHiddenInput(form, 'parameters', parameters)
    addHiddenInput(
      form,
      'query',
      codeVariant === 'TS' ? 'file=/demo.tsx' : 'file=/demo.js'
    )
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  const handleStackBlitzClick = () => {
    const demoConfig = getDemoConfig(demoData, {
      indexPath: 'index.html',
      previewPackage: false,
    })
    const form = document.createElement('form')
    form.method = 'POST'
    form.target = '_blank'
    form.action = 'https://stackblitz.com/run'
    addHiddenInput(form, 'project[template]', 'create-react-app')
    addHiddenInput(form, 'project[title]', demoConfig.title)
    addHiddenInput(
      form,
      'project[description]',
      `# ${demoConfig.title}\n${demoConfig.description}`
    )
    addHiddenInput(
      form,
      'project[dependencies]',
      JSON.stringify(demoConfig.dependencies)
    )
    addHiddenInput(
      form,
      'project[devDependencies]',
      JSON.stringify(demoConfig.devDependencies)
    )
    Object.keys(demoConfig.files).forEach((key) => {
      const value = demoConfig.files[key]
      addHiddenInput(form, `project[files][${key}]`, value)
    })
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  return (
    <div className="max-w-screen-lg mx-auto min-h-[100vh] py-10 px-2">
      <h1 className="text-2xl font-bold mb-4">{demoData.title}</h1>
      <Highlight {...defaultProps} code={demoData.raw} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <div className="flex justify-between gap-2 py-4">
        <div className="flex gap-2">
          <button
            aria-pressed={codeVariant === 'JS'}
            onClick={() => setCodeVariant('JS')}
            className={
              codeVariant === 'JS'
                ? 'bg-blue-700 text-white hover:bg-blue-600'
                : ''
            }>
            JS
          </button>
          <button
            aria-pressed={codeVariant === 'TS'}
            onClick={() => setCodeVariant('TS')}
            className={
              codeVariant === 'TS'
                ? 'bg-blue-700 text-white hover:bg-blue-600'
                : ''
            }>
            TS
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCodeSandboxClick}>CodeSandbox</button>
          <button onClick={handleStackBlitzClick}>StackBlitz</button>
        </div>
      </div>
    </div>
  )
}

export default App
