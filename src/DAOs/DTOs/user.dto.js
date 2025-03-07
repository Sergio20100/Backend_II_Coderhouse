export default class UserDTO{
    constructor(user,in_or_out){
        this.#init(user,in_or_out)
    }

    #init(user,in_or_out){
        if(in_or_out==="in" || in_or_out==="IN"){
            this.user = {...user};
        }
        if(in_or_out==="out" || in_or_out==="OUT"){
            this.id = user._id;
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.email = user.email;
            this.role = user.role;
            this.cart_id = user.cart;
            this.creation_date = user.createdAt;
        }
    }
}