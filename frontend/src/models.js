

class Student {
    constructor(id, profile_pic, email, name, date_of_birth, total_time, hashed_password, favorites){
        this.id = id;
        this.profile_pic = profile_pic;
        this.email = email;
        this.name = name;
        this.date_of_birth = date_of_birth;
        this.total_time = total_time;
        this.hashed_password = hashed_password;
        this.favorites = favorites;
    }
    // id= String;
    // email= String;
    // name= String;
    // date_of_birth= Date;
    // total_time= String;
    // hashed_password = String;
    // favorites = [];
}


export default Student;
// id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
//     profile_pic: str
//     email: str
//     name: str = Field(...)
//     date_of_birth: date = Field(...)
//     favorites: str
//     total_time: int