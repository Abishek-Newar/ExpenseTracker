import { ChangeEventHandler } from "react"

export interface labelType{
    type: string,
    placeholder: string,
    id: string,
    onChange: ChangeEventHandler<HTMLInputElement>
  }
export interface ResponseType{
  _id: string,
  title: string,
  money: number,
  date: string,
  userId: string
}
export interface ButtonType{
  name: string
  onClick: (e:any)=>void
}

