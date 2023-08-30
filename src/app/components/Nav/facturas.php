  $fecha = date('Y-m-d\TH:i:s');
    $fechaMenosCinco = strtotime('-5 minute', strtotime($fecha));
    $fechaMenosCinco = date('Y-m-d\TH:i:s', $fechaMenosCinco);
    $xml_cadena = '<?xml version="1.0" encoding="UTF-8"?>
  <cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd"
  Version="4.0" Serie="B" Folio="' . $args["Folio"] . '" Fecha="' . $fechaMenosCinco . '" FormaPago="' . $args["FormaPago"] . '" NoCertificado="' . $this->NoCertificado . '" CondicionesDePago="' . $args["CondicionesDePago"] . '"
  SubTotal="' . $args["SubTotal"] . '" Descuento="' . $args["Descuento"] . '" Moneda="MXN" TipoCambio="1" Total="' . $args["Total"] . '" TipoDeComprobante="' . $args["TipoDeComprobante"] . '" Exportacion="01"  MetodoPago="' . $args["MetodoPago"] . '" LugarExpedicion="03100"
      Certificado="" Sello="">';
    if ($args["checkboxRelacionado"] == "true") {
        $xml_cadena .= '<cfdi:CfdiRelacionados TipoRelacion="' . $args["TipoRelacion"] . '">
                            <cfdi:CfdiRelacionado UUID="' . $args["UUID"] . '"/>
                        </cfdi:CfdiRelacionados>';
    }
    $xml_cadena .= '
        <cfdi:Emisor Rfc="' . $this->emisorRFC . '" Nombre="PRUEBA.COM.MX "  RegimenFiscal="601"/>
                    <cfdi:Receptor Rfc="' . $args["receptorRfc"] . '" Nombre="' . $args["receptorNombre"] . '" DomicilioFiscalReceptor="' . $args["receptorDomicilio"] . '" RegimenFiscalReceptor="612" UsoCFDI="' . $args["receptorUso"] . '"/>
                    <cfdi:Conceptos>';
    foreach ($args["concepto"] as $key => $value) {
        $baseTranslado = $value["Importe"];
        if ($value["DescuentoProd"] != '0.00') {
            $baseTranslado = number_format($value["Importe"] - $value["DescuentoProd"], 2, '.', '');
        }
        $xml_cadena .= '<cfdi:Concepto ClaveProdServ="' . $value["ClaveProdServ"] . '" NoIdentificacion="' . $value["NoIdentificacion"] . '" Cantidad="' . $value["Cantidad"] . '" ClaveUnidad="E48" Unidad="Unidad de Servicio" Descripcion="' . $value["Descripcion"] . '" ValorUnitario="' . $value["ValorUnitario"] . '" Importe="' . $value["Importe"] . '" Descuento="' . $value["DescuentoProd"] . '" ObjetoImp="02">
                    <cfdi:Impuestos>
                    <cfdi:Traslados>
                    <cfdi:Traslado Base="' . $baseTranslado . '" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="' . $value["IVAProd"] . '" />
                    </cfdi:Traslados>
                    </cfdi:Impuestos>
                    </cfdi:Concepto>';
    }
    $xml_cadena .= '</cfdi:Conceptos>
      <cfdi:Impuestos TotalImpuestosTrasladados="' . $args["IVA"] . '">
      <cfdi:Traslados>
      <cfdi:Traslado Base="' . $baseTranslado . '"  Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="' . $args["IVA"] . '" />
      </cfdi:Traslados>
      </cfdi:Impuestos>';
    if ($args["checkboxINE"] == "true") {
        $xml_cadena .= '
        <cfdi:Complemento>
            <ine:INE Version="1.1" TipoProceso="' . $args['TipoProceso'] . '"';
        if ($args['TipoComite']) $xml_cadena .= ' TipoComite="' . $args['TipoComite'] . '" ';
        if ($args['IdContabilidad']) $xml_cadena .= ' IdContabilidad="' . $args['IdContabilidad'] . '" ';
        $xml_cadena .= '>';
        if ($args['ClaveEntidad']) {
            $xml_cadena .= '<ine:Entidad ClaveEntidad="' . $args['ClaveEntidad'] . '"';
            if ($args['Ambito']) $xml_cadena .= ' Ambito="' . $args['Ambito'] . '"';
            $xml_cadena .= '>';
            if ($args['ContabilidadIdContabilidad']) $xml_cadena .= '<ine:Contabilidad IdContabilidad="' . $args['ContabilidadIdContabilidad'] . '"/>';
            $xml_cadena .= '</ine:Entidad>';
        }
        $xml_cadena .= '</ine:INE>
                            </cfdi:Complemento>';
    }
    $xml_cadena .= '</cfdi:Comprobante>';

    /* Fixing Amperson error in receptorName*/
    $xml_cadena = str_replace("&", "&amp;", $xml_cadena);

    $new_xml = $this->generateOriginalChainAndSign($xml_cadena, 'timbre');

    return $new_xml;
}
