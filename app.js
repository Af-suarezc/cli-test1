import inquirer from 'inquirer';
import alert from 'alert';

//using the inquirer package in order to get the user input via console
const data= inquirer.prompt([{
    name:'ipAddress',
    message:'type your ip address',
    default:'as an example 192.0.2.1',
    validate:function(ipAddress){
        if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)){
            return true
        }else{
            alert('Wrong ip typing try again please')
        }
    }
},{
    name:'mask',
    message:'type your mask address',
    default:'as an example  255.0.0.0',
    validate:function(mask){
        if(/^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/.test(mask)){
            return true
        }else{
            alert('Wrong mask, please try again')
        }
    }
}]).then(answers=>{
    return answers
})

let userInput = await data;
//validate if the Ip address have a mask 24, by comparing the mask value to the 24 CIDR standar
async function tester(obj){
    let ip = await obj.ipAddress;
    let mask = await obj.mask;
    if(mask==='255.255.255.0'){
        console.log(`Dear user your CIDR Ip/mask is: ${ip}/24`)
    }else{
        console.log(`Dear user, your Ip-Address (${ip}) is valid but it's not a mask 24 according to CIDR standar`)
    }
}

tester(userInput)
