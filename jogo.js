var timerId = null;

function iniciaJogo()
{
	var url = window.location.search;
	
	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	var qtd_baloes = 0;

	//facil -> 120s
	if(nivel_jogo == 1)
	{
		tempo_segundos = 120;
		qtd_baloes = 80;
	}
	//normal -> 60s
	if(nivel_jogo == 2)
	{
		tempo_segundos = 60;
		qtd_baloes = 60;
	}
	//difícil -> 30s
	if(nivel_jogo == 3)
	{
		tempo_segundos = 30;
		qtd_baloes = 40;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;//innerHTML -> insere um conteúdo dentro da tag

	//includindo os balões 

	cria_baloes(qtd_baloes)


	document.getElementById('qtd-baloes').innerHTML = qtd_baloes;
	document.getElementById('baloes-estourados').innerHTML = 0;


	contagem_tempo(tempo_segundos+1);


}
//coração do jogo 
function contagem_tempo(segundos)
{
	segundos--;

	if(segundos == -1)
	{
		clearTimeout(timerId);//para a execução do setTimeout();
		gamer_ouver();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function gamer_ouver()
{
	alert("Você perdeu!");
	return false; 
}

function cria_baloes(qtd_baloes)
{

	for(var i = 1; i<=qtd_baloes; i++)
	{
		var baloes = document.createElement("img");
		baloes.src = 'imagens/balao_azul_pequeno.png';
		baloes.style.margin = '10px';
		baloes.id = 'b'+i; 
		baloes.onclick = function(){ estourar(this);}

		document.getElementById('cenario').appendChild(baloes);
	}
}

function estourar(e)
{
	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);

}

function pontuacao(acao)
{
	var baloes_inteiros = document.getElementById('qtd-baloes').innerHTML;
	var baloes_estourados = document.getElementById('baloes-estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('qtd-baloes').innerHTML = baloes_inteiros;
	document.getElementById('baloes-estourados').innerHTML = baloes_estourados;

	situacao(baloes_inteiros);
}

function situacao(baloes_inteiros)
{
	if(baloes_inteiros == 0)
	{
		alert('Parabéns, você ganhou!');
		pararJogo();
	}
}

function pararJogo()
{
	clearTimeout(timerId);
}