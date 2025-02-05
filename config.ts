import 'dotenv/config'


class ConfigEnv {

    private readonly port = process.env.PORT
    private readonly uri_db = process.env.URI_DB
    private readonly jwt_secret = process.env.JWT_SECRET
    private readonly uri_redis = process.env.URI_REDIS

    get_port(){
        return this.port
    }


    get_uridb(){
       return this.uri_db 
    }

    get_jwt_secret(){
        return this.jwt_secret
    }

    get_uri_redis(){
        return this.uri_redis
    }
}




export default new ConfigEnv 