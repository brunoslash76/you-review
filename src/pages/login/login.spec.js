
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { reduceRight } from 'lodash'
import Login from './index'

describe('Login Page', () => {
    test('Should show errors when all fields are empty', async () => {
        render(<Login />)
        fireEvent.click(screen.getByTestId('button-submit'))
        console.log(screen.getByTestId("error-message"))
    })
})