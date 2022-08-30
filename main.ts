class User {
    private name: string;
    private password: string;
    private email: string;
    private id: number;
    constructor(name: string, password: string, email: string, id: number) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.id = id;
    }
    public get Name(): string {
        return this.name;
    }
    public get pass(): string {
        return this.password;
    }
    public get address(): string {
        return this.email;
    }
    public get Id(): number {
        return this.id;
    }
    public set Name(names: string){
        this.name = names;
    }
    public set pass(npass: string){
        this.password = npass;
    }
    public set address(nEmail:string){
        this.email = nEmail;
    }
    public set Id(nId:number){
       this.id = nId;
    }
}
let f1 = document.querySelector('.validUser') as HTMLFormElement;
let mas: User[] = [];
let index: number = 0;
let user: User;
let loginRegExp: RegExp = /^[a-z]{4,16}$/i;
let passwordRegExp: RegExp = /^[-_\w\.]{4,16}$/;
let emailRegExp: RegExp = /^[-\w\.]{1,}@\w{1,}\.\w{1,}$/;

f1.add.addEventListener('click', addUser);
function addUser() {
    event.preventDefault();
    if (loginRegExp.test(f1.login.value) && passwordRegExp.test(f1.password.value) && emailRegExp.test(f1.email.value)) {
        if(mas.length==0){
            index=0;
        } 
        mas[index] = new User(f1.login.value, f1.password.value, f1.email.value, index);
        index++;
        render();

    }
    else {
        console.log('wrong valid');
    }
    f1.reset();
}
function render(): void {
    let str: string = '';
    for (let i = 0; i < mas.length; i++) {
        str += `<div class="info"><p class="field">${mas[i].Id + 1}</p><p class="field">${mas[i].Name}</p> <p class="field">${mas[i].pass}</p><p class="field">${mas[i].address}</p>
                <input type="button" class="edit-btn" onclick="editUser()" value="Edit">
                <button class="delete-btn" onclick = "deleteUser()">Delete</button></div>`;
    }
    document.querySelector('.ulist').innerHTML = str;
}
// let ind;
function deleteUser(): void {
    let a: number;
    for (let i = 0; i < document.querySelector('.ulist').children.length; i++) {
        for (let j = 0; j < document.querySelectorAll('.info')[i].children.length; j++) {
            if (document.querySelector('.ulist').children[i].children[j] == event.target) {
                a = i;
                break;
            }
        }

    }

    mas.splice(a, 1);
    for (let k = 0; k < mas.length; k++) {
        mas[k].Id = k;
    }
    f1.reset();
    f1.edit.classList.add('hide');
    f1.add.classList.remove('hide');
    render();

}
let userindex:number;
function editUser(): void {
    for (let i = 0; i < document.querySelector('.ulist').children.length; i++) {
        for (let j = 0; j < document.querySelectorAll('.info')[i].children.length; j++) {
            if (document.querySelector('.ulist').children[i].children[j] == event.target) {
                userindex = i;
                break;
            }
        }

    }
    f1.edit.classList.remove('hide');
    f1.add.classList.add('hide');
    f1.login.value = mas[userindex].Name;
    f1.password.value = mas[userindex].pass;
    f1.email.value = mas[userindex].address;

}



f1.edit.addEventListener('click', saveEditUser);
function saveEditUser(): void {
    event.preventDefault();
    let newLogin: string = f1.login.value;
    let newPassword: string = f1.password.value;
    let newEmail: string = f1.email.value;
    if (loginRegExp.test(f1.login.value) && passwordRegExp.test(f1.password.value) && emailRegExp.test(f1.email.value)) {
        mas[userindex] = new User(newLogin, newPassword, newEmail, userindex);
        render();
    }
    else {
        console.log('wrong edit');
    }
    f1.reset();
    f1.edit.classList.add('hide');
    f1.add.classList.remove('hide');
    console.log(mas);
}