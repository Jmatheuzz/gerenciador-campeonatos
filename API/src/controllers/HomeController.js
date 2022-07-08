class HomeController{
    index(req, res){
        res.json({"tudo ok": "true"});
    }
}

export default new HomeController();