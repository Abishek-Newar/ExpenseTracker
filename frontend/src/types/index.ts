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

interface PieChartData {
  name: string;
  value: number;
}

export interface PieChartProps {
  data: PieChartData[];
  width: number,
  height: number;
}

export interface ValuesPros{
  Spend: number,
  Earn: number
}

export interface PiePros{
  values: ValuesPros,
  title: string
}
export type Maps = Map<number, number>;
