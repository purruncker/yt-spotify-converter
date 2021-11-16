import { environment } from "src/environments/environment"

const apiBaseUrl: string = environment.production ? "http://localhost:3000" : "http://localhost:3000"

export const config = {
    apiBaseUrl
}