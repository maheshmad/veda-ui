describe('Should handle frames in the page pointing to other domains', function (t) {

    document.body.innerHTML = '<div class="contactBlock"><div id="j_id0:j_id27:j_id28" class="bPageBlock brandSecondaryBrd apexDefaultPageBlock secondaryPalette"><div class="pbHeader"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="pbTitle">&nbsp;</td><td id="j_id0:j_id27:j_id28:j_id32" class="pbButton "><input type="submit" name="j_id0:j_id27:j_id28:j_id32:j_id33" value="Save" class="btn" data-tid="saveBtn"></td></tr></tbody></table></div><div class="pbBody"><div id="j_id0:j_id27:j_id28:j_id29"><div class="pbSubsection"><table class="detailList" border="0" cellpadding="0" cellspacing="0"><tbody><tr><th class="labelCol vfLabelColTextWrap  first " scope="row"><label for="j_id0:j_id27:j_id28:j_id29:myField">First Name</label></th><td class="dataCol  first "><input data-tid="firstName" id="j_id0:j_id27:j_id28:j_id29:myField" maxlength="40" name="j_id0:j_id27:j_id28:j_id29:myField" size="20" type="text" value=""></td><th class="labelCol vfLabelColTextWrap  first " scope="row"><label for="j_id0:j_id27:j_id28:j_id29:j_id30">Last Name</label></th><td class="dataCol  first "><div class="requiredInput"><div class="requiredBlock"></div><input class="error" data-tid="lastName" id="j_id0:j_id27:j_id28:j_id29:j_id30" maxlength="80" name="j_id0:j_id27:j_id28:j_id29:j_id30" size="20" type="text" value=""><div class="errorMsg"><strong>Error:</strong> You must enter a value</div></div></td></tr><tr><th class="labelCol vfLabelColTextWrap  last " scope="row"><label for="j_id0:j_id27:j_id28:j_id29:j_id31">Email</label></th><td class="dataCol  last "><input data-tid="email" id="j_id0:j_id27:j_id28:j_id29:j_id31" maxlength="80" name="j_id0:j_id27:j_id28:j_id29:j_id31" size="20" type="text" value=""></td><td class="labelCol empty">&nbsp;</td><td class="dataCol empty">&nbsp;</td></tr></tbody></table></div></div></div><div class="pbBottomButtons"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="pbTitle">&nbsp;</td><td id="j_id0:j_id27:j_id28:j_id32:bottom" class="pbButtonb "><input type="submit" name="j_id0:j_id27:j_id28:j_id32:bottom:j_id33" value="Save" class="btn" data-tid="saveBtn"></td></tr></tbody></table></div><div class="pbFooter secondaryPalette"><div class="bg"></div></div></div></div>';


    var recorder = new Siesta.Recorder.ExtJS({ ignoreSynthetic : false });
    recorder.attach(window);

})