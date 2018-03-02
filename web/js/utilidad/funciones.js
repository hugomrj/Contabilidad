
     

function getDataForm(formulario){

        CamposImput = formulario.getElementsByTagName("input");
        var str = "";
        for(var i=0; i< CamposImput.length; i++) {

            if (str  != "")
            {
                str =  str  + "&";
            }
                str =  str  + CamposImput[i].getAttribute('name');
                str =   str + "=";
                str =   str + CamposImput[i].value;                
        }

        
        return str;
}


function getPost( prefijo, array ){
    
    var retorno = "";

    for (var i=0; i < array.length; i++)
    {
        retorno = retorno+ "&" + array[i] +"=" + document.getElementById(prefijo+array[i]).innerHTML
    }   
    
    return retorno;
  
}







/*
function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57)){
      return false; 
   }
      
   return true;
}
*/




function fmtNum(num) {


    num = num.toString().trim();

    //num = num.replace(/\./g,'');
    num =  num.replace(new RegExp(",","g") ,"");   

    if(!isNaN(num))
    {        
        auxNum = num;        
        // aca hay que controlar si es un numero negativo
        if (auxNum < 0)
        {
            num = num * -1;
        }
        num = Number(num);
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1,');
        num = num.split('').reverse().join('').replace(/^[\,]/,'');
        
        if (auxNum < 0)
        {
            num = "-"+num;
        }
        
        return num;
    }
    else{ 

        return 0;
    }

}




function validaFloat(valor) {
    var RE =/^[0-9]+([.])?([0-9]+)?$/;
    if (RE.test(valor)) {
        return valor;
    } else {
        return 0;
    }
}




function NumQP(strnumero) {

    var buscar="," 
    var resultado = 0;
    
    resultado =  strnumero.replace(new RegExp(buscar,"g") ,"");   
    return resultado; 
}





function zero(StrElemento)
{
    var elemento = document.getElementById(StrElemento) ;
    if (elemento.value.trim()=='')
    {
        elemento.value = 0;
    }
}



function formatoFecha(str) {
    
    var retorno = "";

    if (str == ""){
        return;
    }
    
    retorno = str.substring(8,10); 
    var mes = "";
    mes = MesCorto(str.substring(4,7));
        
    retorno = retorno + " " + mes ;
//  Mon May 02 22:41:47 PYT 2016
//  Tue Apr 18 00:00:00 CDT 2017
    retorno = retorno + " " + Right(str, 4);

    return retorno;

}


function formatoFechaISO(str) {
    
    var retorno = "";

    if (str == ""){
        return;
    }
    
    retorno = str.substring(8,10);         
    var mes = "";
    mes = MesCorto(str.substring(5,7));
        
    retorno = retorno + " " + mes ;
    retorno = retorno + " " + str.substring(0,4) ;
    return retorno;
}



function MesCorto(mes){
    var retornar = "";
    mes = mes.toString().toLowerCase();
    
    if (mes == "jan" || mes == "01" ){
        retornar = "Ene";
    }
    else if (mes == "feb" || mes ==  "02" ){
        retornar = "Feb";
    }
    else if (mes == "mar" || mes ==  "03" ){
        retornar = "Mar";
    }    
    else if (mes == "apr" || mes ==  "04" ){
        retornar = "Abr";
    }        
    else if (mes == "may" || mes ==  "05" ){
        retornar = "May";
    }        
    else if (mes == "jun" || mes ==  "06" ){
        retornar = "Jun";
    }        
    else if (mes == "jul" || mes == "07" ){
        retornar = "Jul";
    }    
    else if ( mes == "aug" || mes == "08" ){
        retornar = "Ago";
    }    
    else if (mes == "sep" || mes == "09" ){
        retornar = "Sep";
    }            
    else if ( mes == "oct" ||  mes == "10" ){
        retornar = "Oct";
    }            
    else if (mes == "nov" || mes ==  "11" ){
        retornar = "Nov";
    }
    else if ( mes == "dec" ||   mes == "12" ){
        retornar = "Dic";
    }        
    
    return retornar;
}




function MesNumero(mes){
    var retornar = "";

    
    if (mes == "Jan" || mes == "01" ){
        retornar = "01";
    }
    else if (mes == "Feb" || mes ==  "02" ){
        retornar = "02";
    }
    else if (mes == "Mar" || mes ==  "03" ){
        retornar = "03";
    }    
    else if (mes == "Abr" || mes ==  "04" ){
        retornar = "04";
    }        
    else if (mes == "May" || mes ==  "05" ){
        retornar = "05";
    }        
    else if (mes == "Jun" || mes ==  "06" ){
        retornar = "06";
    }        
    else if (mes == "Jul" || mes == "07" ){
        retornar = "07";
    }    
    else if ( mes == "Aug" || mes == "08" ){
        retornar = "08";
    }    
    else if (mes == "Sep" || mes == "09" ){
        retornar = "09";
    }            
    else if ( mes == "Oct" ||  mes == "10" ){
        retornar = "10";
    }            
    else if (mes == "Nov" || mes ==  "11" ){
        retornar = "11";
    }
    else if ( mes == "Dec" ||   mes == "12" ){
        retornar = "12";
    }        
    
    return retornar;
}







function Left(str, n){
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0,n);
}
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}




function multiplicar(factor1, factor2){
    
    
    var producto = 0;
    producto = qcoma(factor1) * qcoma(factor2) ;    
    
    return producto;
}


function qcoma (strnumero){
    
    var buscar="," 
    var resultado = 0;
    
    resultado =  strnumero.replace(new RegExp(buscar,"g") ,"");   
    return resultado;      
    
}

function quitapunto (strnumero){
    
    var buscar="." 
    var resultado = 0;
    
    resultado =  strnumero.replace(/[.]/gi,'');
    return resultado;      
    
}




function convertirFecha(str) {
        
    var retorno = "";
    if (str == ""){
        return;
    }    
    var dd = str.substring(0,2); 
    var mm = str.substring(3,5); 
    var aaaa = str.substring(6,10); 
        
    return aaaa+"-"+mm+"-"+dd;

}






function validaFechaDDMMAAAA(fecha){
	var dtCh= "/";
	var minYear=1900;
	var maxYear=2100;
	function isInteger(s){
		var i;
		for (i = 0; i < s.length; i++){
			var c = s.charAt(i);
			if (((c < "0") || (c > "9"))) return false;
		}
		return true;
	}
	function stripCharsInBag(s, bag){
		var i;
		var returnString = "";
		for (i = 0; i < s.length; i++){
			var c = s.charAt(i);
			if (bag.indexOf(c) == -1) returnString += c;
		}
		return returnString;
	}
	function daysInFebruary (year){
		return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
	}
	function DaysArray(n) {
		for (var i = 1; i <= n; i++) {
			this[i] = 31
			if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
			if (i==2) {this[i] = 29}
		}
		return this
	}
	function isDate(dtStr){
		var daysInMonth = DaysArray(12)
		var pos1=dtStr.indexOf(dtCh)
		var pos2=dtStr.indexOf(dtCh,pos1+1)
		var strDay=dtStr.substring(0,pos1)
		var strMonth=dtStr.substring(pos1+1,pos2)
		var strYear=dtStr.substring(pos2+1)
		strYr=strYear
		if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
		if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
		for (var i = 1; i <= 3; i++) {
			if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
		}
		month=parseInt(strMonth)
		day=parseInt(strDay)
		year=parseInt(strYr)
		if (pos1==-1 || pos2==-1){
			return false;
		}
		if (strMonth.length<1 || month<1 || month>12){
			return false;
		}
		if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
			return false;
		}
		if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
			return false;
		}
		if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
			return false;
		}
		return true;
	}
	if(isDate(fecha)){
		return true;
	}else{
		return false;
	}
}






    function getAllParamPath()
    {
        // capturamos la url
        var loc = document.location.href;
        // si existe el interrogante
        if(loc.indexOf('?')>0)
        {
            // cogemos la parte de la url que hay despues del interrogante
            var getString = loc.split('?')[1];
            // obtenemos un array con cada clave=valor
            var GET = getString.split('&');
            var get = {};
 
            // recorremos todo el array de valores
            for(var i = 0, l = GET.length; i < l; i++){
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
            return get;
        }
    }


    function getParametroValor(clave)
    {

        var valores=getAllParamPath();        
        var retorno = 0;
        if(valores)
        {            
            for(var index in valores)
            {                
                if  (index == clave){
                    retorno = valores[index];
                    break;
                }                                
            }
        }
        return retorno;
    }




    function formatoJSONFecha(strfecha)
    {
        var retorno = "";
        
        if (strfecha != undefined) 
        {        
            strfecha = strfecha.toString().trim();
            
            var sepa = strfecha.indexOf(",");
            var dere = strfecha.substring(0, sepa); 
            var izqu = strfecha.substring(sepa+1, 12); 


            if (strfecha != "")
            {
                retorno = dere.substring(4, 8) 
                    +" "+ MesCorto(dere.substring(0, 3)) +" "+ izqu.trim();                       
            }
        }
        return retorno;
    }




    function JSONtoYMD(strfecha)
    {
                
        try { 

            var retorno = "";
            var sepa = strfecha.indexOf(",");
            var dere = strfecha.substring(0, sepa); 
            var izqu = strfecha.substring(sepa+1, 12); 


            if (strfecha != "")
            {
                retorno = izqu.trim()
                    +"-"+ MesNumero(dere.substring(0, 3)) +"-"+(dere.substring(4, 8)<10?'0':'') + dere.substring(4, 8) ;                       
            }

            return retorno;

        }
        catch (e) {
            return null;
        }        
            
    }
    
    
    
    

    function VJson(json, etiqueta, type)
    {
        var e = etiqueta;                
        var v = json[0][e];
        
        if (type === undefined || type === null) {
             type = "C";
        }                
        
        if (v === undefined || v === null) {            
            switch (type)
            {
               case "C": 
                   return  "";
                   break;
               case "N": 
                   return  0;
                   break;                   
               case "D": 
                   return  "";
                   break;                   
                   
               default:  
                    return  "";
            }                            
        }
        else{
            
            switch (type)
            {               
               case "D": 
                   return  JSONtoYMD(v);
                   break;                   
                   
               default:  
                    return   v.toString().trim();
            }                 
            
            
        }
    }    






    function fechaActual()
    {
            var date = new Date();
            
            return date.getFullYear() + "-" 
                        + (date.getMonth()<10?'0':'') + (date.getMonth() + 1) + "-" 
                        + (date.getDate()<10?'0':'') + date.getDate();
            
    }
    

    
    
    

    function getRutaAbsoluta()
    {

        var pathname = window.location.pathname;

        pathname = pathname.substring(1,pathname.length);
        pathname = pathname.substring(0,pathname.indexOf("/"));

        return "/"+pathname ;
            
    }
    

    
    
    
function checkForm(form) // Submit button clicked
{
    
    
    alert("hola");
    
    /*
    form.myButton.disabled = true;
    form.myButton.value = "Please wait...";
    */
    
    return true;
}
    