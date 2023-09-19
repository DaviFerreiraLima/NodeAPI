const express = require('express');
var exphbs  = require('express-handlebars');
const empregadoDAO = require('./repository/empregadoDAO');

let hbs = exphbs.create({defaultLayout: 'main', 
extname:'.hbs'});

const app = express();

const PORT = 9000;


app.engine('hbs',hbs.engine);
app.set('view engine','hbs');


app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname+'/public'));




app.get('/', (req, res)=>{
    res.render('main',{layout:'home'});
});


app.get('/empregados', async(req,res)=>{
    const [empregados] = await empregadoDAO.listarEmpregados();
    res.render('main',{layout:'empregados/listar',empregados});
})

app.get('/empregados/salvar', async(req,res) => {
    res.render('main',{layout:'empregados/form'})
})

app.post('/empregados', async (req,res) =>{
    const empregado = {
        nome : req.body.nome,
        telefone : req.body.telefone,
        email : req.body.email,
        endereco : req.body.email,
        id : req.body.id
    }
    if(empregado.id){
        await empregadoDAO.atualizarEmpregado(empregado)
    }else{
        await empregadoDAO.salvarEmpregado(empregado)
    }
    res.redirect('/empregados');
});


app.get('/empregados/atualizar', async(req,res) => {
    const [empregados] = await empregadoDAO.pegarEmpregado(req.query.id);
    const empregado = empregados[0]
    res.render('main',{layout:'empregados/form',empregado})
})


app.get('/empregados/remover',async(req,res) => {
    await empregadoDAO.deletarEmpregado(req.query.id)
    res.redirect('/empregados')
})




app.listen(PORT,()=>{
    console.log(`Up and Running at: ${PORT}`);
});