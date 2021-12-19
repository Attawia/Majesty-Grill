import jwt from 'jsonwebtoken';

export const authorize = (req, res) => {
    const token = req.body.token;
    const route = req.body.route;
    if(token == '') return res.send(false);
    const username = jwt.verify(token, 'majesty');
    console.log(username);
    console.log(route);
    const adminRoutes = ["/flights/createFlight","/flights/updateflight","/flights/getupdateflight","/flights/:id"];
    if(adminRoutes.includes(route)){
        if(username!=='Administrator') return res.send(false);
        else return res.send(true);
    }
}