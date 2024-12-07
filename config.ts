import 'dotenv/config'


class ConfigEnv {

    #port = process.env.PORT
    #uri_db = process.env.URI_DB


    get_port(){
        return this.#port
    }


    get_uridb(){
       return this.#uri_db 
    }
}




export default new ConfigEnv 