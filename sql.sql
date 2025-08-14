SELECT  TOP 1   LogAccionesSistema.intLacLlave 
, catPersonal.intPrsLlave, catPersonal.strPrsNombre +' '+ catPersonal.strPrsApPaterno+' '+ catPersonal.strPrsApMaterno AS Personal  
, LogAccionesSistema.dtLacFechaUtc 
, catConceptosCobroBitacora.shtCicLlave, catConceptosCobroBitacora.shtConLlave 
FROM         LogAccionesSistema  
INNER JOIN catConceptosCobroBitacora ON LogAccionesSistema.intLacLlave = catConceptosCobroBitacora.intLacLlave  
INNER JOIN catPersonal ON LogAccionesSistema.intPrsLlave = catPersonal.intPrsLlave 
WHERE catConceptosCobroBitacora.shtCicLlave = @shtCicLlave AND catConceptosCobroBitacora.shtConLlave = @shtConLlave 
ORDER BY LogAccionesSistema.dtLacFecha DESC 