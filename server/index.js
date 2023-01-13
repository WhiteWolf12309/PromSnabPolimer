const express = require("express")
const http = require("http")
const cors = require("cors")
const data = require("./database.json")
const admins = require('./admins.json')
const fs = require("fs")
const currentDate = require('./helpers/getCurrentDate')
const bcrypt = require('bcrypt');

const app = express()

const server = http.createServer(app)
const PORT = process.env.PORT || 3001
require("dotenv").config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

// /products
app.get('/products', cors(), async (req, res) => {
    try {

        res.send(data.orders)
        
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    
})

app.post('/products', cors(), async (req, res) => {
    try {
        const reqBody = req.body
        reqBody.status = "new-order"
        reqBody.UID = data.orders.length + 1
        reqBody.date = currentDate()

        data.orders.push(reqBody)

        res.send({
            orderUid: reqBody.UID
        })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


app.put('/products', cors(), async (req, res) => {
    try {
        const reqBody = req.body

        data.orders.forEach(item => {
            if (item.UID === reqBody.id) {
                item.status = reqBody.status
            }
        })

        res.send({status: reqBody.status})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    
})

// /order-call
app.post('/order-call', cors(), async (req, res) => {
    try {
        const reqBody = req.body
        reqBody.status = "new-problem"
        reqBody.UID = data['order-call'].length + 1

        data['order-call'].push(reqBody)

        res.send({
            orderUid: reqBody.UID
        })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.get('/order-call', cors(), async (req, res) => {
    try {
        res.send(data['order-call'])
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.put('/order-call', cors(), async (req, res) => {
    try {        
        const reqBody = req.body

        data['order-call'].forEach(item => {
            if (item.UID === reqBody.id) {
                item.status = reqBody.status
            }
        })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


// /frontend-data
app.get('/catalog-filter-data', cors(), async (req, res) => {
    try{
        res.send(data['frontend-data'])
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})


// /filter-data
app.get('/filter-data', cors(), async (req, res) => {
    try{
        res.send(data['filter-data'])
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})

// /product-items
app.get('/product-items', cors(), async (req, res) => {
    try{
        res.send(data['product-items']['hits'])
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})

app.get('/product-items/:paginationPage', cors(), async (req, res) => {
	try {
		
        let { paginationPage } = req.params
        const pageProductItems = []

        paginationPage = parseInt(paginationPage, 10)
       
        if (paginationPage === 1) {
            for (let i = paginationPage - 1; i < paginationPage + 7; i++) {
                if (data['product-items']['hits'][i]) {
                    const element = data['product-items']['hits'][i];
                    pageProductItems.push(element)
                }
            }
        } else if (paginationPage > 1) {
            const currentPageStart =  (paginationPage - 1) * 8

            for (let i = currentPageStart; i < currentPageStart + 8; i++) {
                if (data['product-items']['hits'][i]) {
                    const element = data['product-items']['hits'][i];
                    pageProductItems.push(element)
                }
            }
        }
        
        data["product-items"].pages = Math.ceil(data['product-items']['hits'].length / 8)

        res.send([pageProductItems, {pages: data["product-items"].pages}])

	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
});


// admins
app.post("/panel/create-admin", cors(), async (req, res) => {
    try {
        const { email, password, firstName, secondName, role } = req.body

        admins.admins.forEach((admin) => {
            if (admin.email === email) {
                res.send({ status: 'error', message: "Такой пользователь уже существует" })
            } else {
                admins.admins.push({
                    id: admins.admins.length + 1,
                    password: bcrypt.hashSync(password, 7),
                    firstName,
                    secondName,
                    role
                })
            }
        })

    } catch (err) {
        console.log(err)
        res.sendStatus(err)
    }
})

app.post("/panel/signin", cors(), async (req, res) => {
    try {
        const { email, password } = req.body
        
        admins.admins.forEach((admin) => {
            if (admin.email === email) {
                const validPassword = bcrypt.compareSync(password, admin.password)
                if (validPassword) {
                    res.send({status: 'success', message: "Вход успешно выполнен" })
                } else {
                    res.send({status: 'error', message: "Неверные данные для входа" })
                }
            } else {
                res.send({status: 'error', message: "Неверные данные для входа" })
            }
        })

    } catch (err) {
        console.log(err)
        res.sendStatus(err)
    }
})


// functions
const saveDataToDatabase = () => {
    try {
        fs.writeFile("database.json", JSON.stringify(data), (err) => {
            console.log(err)
        })
        console.log("Data has been saved...")
    } catch (err) {
        console.log(err)
    }
    
}





server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)

    setInterval(() => {
        saveDataToDatabase()
    }, 3.6e+6)
})