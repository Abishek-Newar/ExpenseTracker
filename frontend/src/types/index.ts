import { ChangeEventHandler } from "react"

export interface labelType{
    type: string,
    placeholder: string,
    id: string,
    onChange: ChangeEventHandler<HTMLInputElement>
  }

export interface ButtonType{
  name: string
  onClick: (e:any)=>void
}

