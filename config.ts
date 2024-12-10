import 'dotenv/config'


class ConfigEnv {

    private readonly port = process.env.PORT
    private readonly uri_db = process.env.URI_DB
    private readonly jwt_secret = process.env.JWT_SECRET

    get_port(){
        return this.port
    }


    get_uridb(){
       return this.uri_db 
    }

    get_jwt_secret(){
        return this.jwt_secret
    }
}




export default new ConfigEnv 