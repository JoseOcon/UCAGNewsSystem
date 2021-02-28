export interface User {
    user_id?: number
    phone_number: number
    user_type_id: number
    name: string
    second_name?: string
    last_name: string
    email:	string
    identification:	string
    password: string
    comunal_member?:	boolean
    active?: boolean
    verified?: boolean
}