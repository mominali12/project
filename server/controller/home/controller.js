const HomeService = require('../../services/homeservice');
const fs = require('fs');
const path = require('path');

//----------------------------------Added for file uploading
const mongodb = require('mongodb')
const binary = mongodb.Binary;
//----------------------------------------


class Controller {
    async GetHome(req, res) {
        //console.log("Hello" + process.env.ACTIVE_USER);
        if (process.env.ACTIVE_USER != "") {

            fs.readFile(path.join(__dirname, '/../../../client_end/home.html'), null, function(error, data) {
                //console.log(path.join(__dirname, '/../../../client_side/login_signup.html'));
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                    });
                    res.write(data);
                    //res.json(orders);
                }
                res.end();
            });
        } else
            res.redirect('/login');
    }

    async SaveData(req, res) {
        if (process.env.ACTIVE_USER != "") {
            let result = await HomeService.SaveData(req.body);
            if (result)
                res.status(200).redirect('/home');
            else
                res.status(400).send(result);
        } else
            res.redirect('/login');
    }

    async SaveCompletedData(req, res) {
        if (process.env.ACTIVE_USER != "") {
            let result = await HomeService.SaveCompletedData(req.body);
            if (result)
                res.status(200).redirect('/home');
            else
                res.status(400).send(result);
        } else
            res.redirect('/login');
    }

    async GetCompletedHome(req, res) {
        //console.log("Hello" + process.env.ACTIVE_USER);
        if (process.env.ACTIVE_USER != "") {
            fs.readFile(path.join(__dirname, '/../../../client_end/completed.html'), null, function(error, data) {
                //console.log(path.join(__dirname, '/../../../client_side/login_signup.html'));
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                    });
                    res.write(data);
                    //res.json(orders);
                }
                res.end();
            });
        } else
            res.redirect('/login');
    }

    async GetOrders(req, res) {
        if (process.env.ACTIVE_USER != "") {
            const orders = await HomeService.getHomeData();
            const firsttimeload = await HomeService.FirstTimeColumnsLoad();
            const types = await HomeService.getColumnTypes();
            let final = { 'orders': orders, 'types': types };
            orders.push({
                'store_logo_path': "assets/" + process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER + '.png',
                'store_logo': process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER,
                'user_id': process.env.ACTIVE_USER_ID
            });
            res.status(200).json(final);
        } else
            res.redirect('/login');
    }

    async GetCompletedOrders(req, res) {
        if (process.env.ACTIVE_USER != "") {
            const orders = await HomeService.getCompletedHomeData();
            const types = await HomeService.getCompletedColumnTypes();
            let final = { 'orders': orders, 'types': types };
            orders.push({
                'store_logo_path': "assets/" + process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER + '.png',
                'store_logo': process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER,
                'user_id': process.env.ACTIVE_USER_ID
            });
            res.status(200).json(final);
        } else
            res.redirect('/login');
    }

    async GetGraph(req, res) {
        if (process.env.ACTIVE_USER != "") {

            fs.readFile(path.join(__dirname, '/../../../client_end/graph.html'), null, function(error, data) {
                //console.log(path.join(__dirname, '/../../../client_side/login_signup.html'));
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                    });
                    res.write(data);
                    //res.json(orders);
                }
                res.end();
            });
        } else
            res.redirect('/login');
    }

    async GetGraphData1(req, res) {
        if (process.env.ACTIVE_USER != "") {
            let final = await HomeService.getGraphData1();
            res.status(200).json(final);
        }

    }

    async NewCustomerForm(req, res) {
        if (process.env.ACTIVE_USER != "") {

            fs.readFile(path.join(__dirname, '/../../../client_end/newcustomer.html'), null, function(error, data) {
                //console.log(path.join(__dirname, '/../../../client_side/login_signup.html'));
                if (error) {
                    res.writeHead(404);
                    res.write('Whoops! File not found!');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                    });
                    res.write(data);
                    //res.json(orders);
                }
                res.end();
            });
        } else
            res.redirect('/login');
    }

    async SaveCustomerData(req, res) {
        if (process.env.ACTIVE_USER != "") {
            let result = await HomeService.SaveCustomerData(req.body, req.files);
            if (result)
                res.status(200).redirect('/newcustomer');
            else
                res.status(400).send(result);
        } else
            res.redirect('/login');
    }

    async UpdateCustomerData(req, res)
    {
        if (process.env.ACTIVE_USER != "")
        {
            let result = await HomeService.UpdateCustomerData(req.body, req.files);
            if (result)
                res.status(200).redirect('/newcustomer');
            else
                res.status(400).send('Business name not found!');
        }
        else
            res.redirect('/login');
    }

    async DeleteCustomerData(req, res) {
        if (process.env.ACTIVE_USER != "") {
            let result = await HomeService.DeleteCustomerData(req.body, req.files);
            if (result)
                res.status(200).redirect('/newcustomer');
            else
                res.status(400).send(result);
        } else
            res.redirect('/login');
    }

    async UploadLogo(req, res) {
        if (process.env.ACTIVE_USER != "") {
            let result = await HomeService.UploadLogo(req.files);
            if (result)
                res.status(200).redirect('/home');
            else
                res.status(400).send(result);
        } else
            res.redirect('/login');
    }

    

    async GetCustomers(req, res)
    {
        if (process.env.ACTIVE_USER != "")
        {
            await HomeService.DeleteFile();
            const customers = await HomeService.getCustomersData();
            res.status(200).json(customers);
        } else
            res.redirect('/login');
    }

    async GetCustomer(req, res) {
        if (process.env.ACTIVE_USER != "")
        {
            const customer = await HomeService.getCustomerData(req.body);
            res.status(200).json(customer);
        }
        else
            res.redirect('/login');
    }

    async GetCustomersBusinessName(req, res) {
        if (process.env.ACTIVE_USER != "") {
            const customers = await HomeService.getCustomerBusinessName();
            res.status(200).json(customers);
        } else
            res.redirect('/login');
    }

    async DownloadFile(req, res) {
        if (process.env.ACTIVE_USER != "") {
            const result = await HomeService.DownloadFile(req.body);
            res.status(200).send(result);

        } else
            res.redirect('/login');
    }

    // async DeleteFile(req, res) {
    //     if (process.env.ACTIVE_USER != "") {
    //         const result = await HomeService.DeleteFile(req.body);
    //         res.status(200).send(result);

    //     } else
    //         res.redirect('/login');
    // }

}

module.exports = new Controller();