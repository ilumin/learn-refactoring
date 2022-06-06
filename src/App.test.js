import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  describe('Click Codesandbox', () => {
    it('should open codesandbox workspace', () => {
      const mockForm = document.createElement('form')
      mockForm.addEventListener('submit', (event) => {
        event.preventDefault()

        expect(mockForm.method).toBe('post')
        expect(mockForm.target).toBe('_blank')
        expect(mockForm.action).toBe(
          'https://codesandbox.io/api/v1/sandboxes/define'
        )
        expect(mockForm.elements.parameters.value).toBe(
          'N4IgZglgNgpgziAXKADgQwMYGs0HMYB0AVnAPYB2SoGFALjObVSOWgLYxIgCCABACYw2pEABoQguBgBOEFLQgUuYiTBQNB5DBHjNpMTE0QgoaenCbiAAmwCuEAPRszMWWihcArAQAcBAAwq-oYAtPykbFym5pYgVkKkChQOwRhGJi4WKvHCSeQOFgCesPxRmbFWAEZolTBQKbaMEBxlMdl2jkSkha3wTAC-4oIAbgAiahoM2rrIIKm0IVKy8gjG0X0ggyDOEJTGu4IAHsQI4ktytKugFmjS6fOLMhdwvDd3m-IKtLBcfILCmy2KFslSgEAwDgOMGOAAtaGwPLMaIwGOkADwAQlGAHkAMIAFQAmgAFACivDhCIAfAAdchoylQXimci4AC8NJADE5tPIvF4DIM_F5_P5aK-sCpfwSaIcEpgItFmJCIV4ADE6C9aKRXrYUChSHdeABZFxuJnjOAQXB8lWKsVg8hYOmi0X6KAckBFWBwGEwGC0Tku10U_RgT1w2goOCIBwOMCagi4UikXCwNAoCBwAg0NgODBwOAAfjA7GghTZACVSJVEqREABmfz-UQAFmbok8HYA7M2AGT8LMoUwVuAAdwzQb5ooc9oFGJVvAAksitTq4HqDUbTfRzbxLdbbSE52jHc7p673Z7vfA_QGpyHQzBw5zI9HY_HE8nU-nM9nc5CyIlmWUAVjurgQO4ADUK4UHAD4zoqsp-mgwrBmitb8IUJ6DsMvAQPwnrSCmgYgFSsq4UhDiYdhdLIfCUBUh8qjCCczDIvQjBcM0W60LwABUvBoC8lYGGkvBgMRbC8AA5PMMkANx0jxhp8QAQrYtDanykkRLJNj2A4XSFA4GlaRQil0nS0K8QIz5oLYUB8WAjRpIofJqcJ4JmdpcAABQAJS8MAwb6LQtjSHyfnBmKPkULwwy3JBjCesOaC7DyxKmLsspxeQioBUp5D9MxULHCQ7F0Ki3FsLZgnCbwomGBJUmyfJRUqUaTVpDixotXpcliQs4R5hgYKopZ5CdXxwC8AAyrQxQwPwpKsrsMDEsRwwEa4oi8LihYAGq3HAm2kNtgjSLw_T9dJMkGZ03QFItPqTdN-4JLdskEA4_ykJNdLdbQvU5sE9DVokfnhBgtgcIwBAAI62K4hRzXUMBpIa0UgAAxMRiScgFAUEPo5CXdF05ogtS0rWt5AbVtO1XbsRAY7QaoQNIFgngdcDHVzZ0Xa4c5iuMwi8LOMUCg4vP86djOXVR1MlKtuDrYLTO8oVgL9EAA'
        )
        expect(mockForm.elements.query.value).toBe('file=/demo.js')
      })

      const { getByText } = render(<App />)

      jest.spyOn(document, 'createElement').mockReturnValueOnce(mockForm)

      const spyBodyAppendChild = jest.spyOn(document.body, 'appendChild')
      const spyBodyRemoveChild = jest.spyOn(document.body, 'removeChild')

      userEvent.click(getByText('CodeSandbox'))

      // append form
      expect(spyBodyAppendChild).toHaveBeenCalledWith(mockForm)

      // remove form after finish
      expect(spyBodyRemoveChild).toHaveBeenCalledWith(mockForm)
    })
  })

  describe('Click Stackblitz', () => {
    it.todo('should open stackblitz workspace')
  })
})
