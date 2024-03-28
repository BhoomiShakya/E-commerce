const mongoose = require('mongoose');
const Product = require('./model/Product');

let products=[
    {
        name: "Modi Ji",
        img:"https://bharatiyavishwa.com/wp-content/uploads/2020/06/narendra-modi-thinking.jpg",
        price:1500000,
        desc:"bahut bhadia gendbaaz"
    },{
        name: "Kejriwal",
        img:"https://www.opindia.com/wp-content/uploads/2021/02/kejriwal-yawning.jpg",
        price: 150,
        desc:"Jheelo ka seher"
    },{
        name: "Rahul Gandhi",
        img:"https://i.pinimg.com/564x/e0/3b/c1/e03bc1ebff42904a39537ef71ddc2ffd.jpg",
        price:450,
        desc:"idhar se aalu daalo udhar se sona niklega"
    },{
        name: "Georgia Meloni",
        img:"https://sm.mashable.com/t/mashable_in/photo/default/aa-art-cover-new-2023-08-10t133233670-79_w23p.1248.jpg",
        price:6000,
        desc: "Bewafa"
    },
    {
        name: "Bhupendra jogi",
        img:"https://www.bichhu.com/wp-content/uploads/2023/06/bhupendra.jpg",
        price:200000,
        desc: "us mai bhot jankari h"
    },
    {
        name: "Arvind Bhaiya",
        img:"https://mc-cdn.com/dLcFzULe0qHVxJNVMnnSyNlun713uA8576115.jpg",
        price:200000,
        desc: "Chip Hatado"
    }
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("Data Seeded");
}

module.exports=seedDB;