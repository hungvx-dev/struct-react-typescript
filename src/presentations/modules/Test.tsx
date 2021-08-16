import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks/useStore'

type Inputs = {
  example: string
  exampleRequired: string
}

const promise = (data: number, wait = 1000): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), wait)
  })

const actionThunk2 = (data: number) => async (dispatch: any) => {
  dispatch({ type: 'increment', payload: data })
}

const actionThunk = (data: number) => async (dispatch: any) => {
  console.log(data)
  dispatch({ type: 'incrementA', payload: data })
  const data2 = await promise(data)
  dispatch({ type: 'increment', payload: data2 })
  dispatch(actionThunk2(data))
}

function Test() {
  const [test, setTest] = useState(0)
  const [test1, setTest1] = useState(0)
  const state = useAppSelector((state) => state)
  const dispatch = useDispatch()
  // const { register, handleSubmit, watch, formState } = useForm()<Inputs>()
  // const state = useAppSelector((state) => state)

  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //  console.log(data)
  // }

  // console.log(state)
  useEffect(() => {
    console.log(test)
  }, [test])

  console.log(test, test1, state)

  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          // setTest(test +1)
          // dispatch({ type: 'incrementA', payload: 45 })
          // dispatch({ type: 'increment', payload: 32 })
          // setTest(test + 123)

          const data = await promise(123)
          // const data = 123
          // setTest(test + data)
          // setTest(test + data + 1)
          // setTest(test + data)
          // setTest(test + data)

          // setTest1((test) => test + data)
          dispatch(actionThunk(data))
          // dispatch({ type: 'incrementA', payload: data })
        }}
      >
        hung
      </button>
      <table>
        <tbody>
          <tr className="tr">
            <td className="td">{test}</td>
            <td className="td">{test1}</td>
          </tr>
          <tr className="tr">
            <td className="td">{state.test}</td>
            <td className="td">{state.test1}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div>hung</div>
      </div>
    </div>
  )
}

export default Test
