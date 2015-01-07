var TipCalcView = function(){
  this.tipCalc = new TipCalc(0, 0, 15, 0);

  this.clearRound();
  this.listen();
  this.update();
}

TipCalcView.prototype.clickReset = function(event){
  this.tipCalc = new TipCalc(0, 0, 15, 0);
  this.clearRound();
  this.update();
}

TipCalcView.convertToNumber = function(string){
  return parseFloat(string);
};

TipCalcView.convertToString = function(number){
  if(number == 0){
    return "0.00";
  }

  number = Math.round(number * 100);
  var string = "" + number;
  var dollars = string.slice(0, -2);
  var cents = string.slice(-2);
  return dollars + "." + cents;
};

TipCalcView.prototype.update = function(){
  var inputBillVal =  TipCalcView.convertToString(this.tipCalc.billAmount);

  var inputTipPercentVal = Math.round(this.tipCalc.tipPercent);

  var inputTiplVal =  TipCalcView.convertToString(this.tipCalc.tipAmount);

  var inputTotalVal =  TipCalcView.convertToString(this.tipCalc.totalAmount);

  $("#input-bill").val(inputBillVal);
  $("#output-percent").html(inputTipPercentVal);
  $("#input-percent").val(inputTipPercentVal);
  $("#input-tip").val(inputTiplVal);
  $("#input-total").val(inputTotalVal);

  $(".percent-numbers button").removeClass("active");
  $(".percent-numbers button[data-percent='" + inputTipPercentVal + "']").addClass("active");

  $(".round button").removeClass("active");

  if (this.round){
    $(".round button[data-round='" + this.round + "']").addClass("active");
  }
};

TipCalcView.prototype.clearRound = function(){
  this.round = null;
  this.preRoundAmount = null;
}

TipCalcView.prototype.changeBillAmount = function(event){
  this.clearRound();
  var billAmount = $(event.currentTarget).val();
  billAmount = TipCalcView.convertToNumber(billAmount);
  this.tipCalc.setBillAmount(billAmount);
  this.update();
};

TipCalcView.prototype.changeTipPercent = function(event){
  this.clearRound();
  var tipPercent = $(event.currentTarget).val();
  tipPercent = TipCalcView.convertToNumber(tipPercent);
  this.tipCalc.setTipPercent(tipPercent);
  this.update();
};

TipCalcView.prototype.changeTipAmount = function(event){
  this.clearRound();
  var tipAmount = $(event.currentTarget).val();
  tipAmount = TipCalcView.convertToNumber(tipAmount);
  this.tipCalc.setTipAmount(tipAmount);
  this.update();
};

TipCalcView.prototype.changeTotalAmount = function(event){
  var totalAmount = $(event.currentTarget).val();
  totalAmount = TipCalcView.convertToNumber(totalAmount);
  this.tipCalc.setTotalAmount(totalAmount);
  this.update();
};

TipCalcView.prototype.clickPercentNumbers = function(event){
  this.clearRound();
  var tipPercent = $(event.currentTarget).attr("data-percent");
  tipPercent = TipCalcView.convertToNumber(tipPercent);
  this.tipCalc.setTipPercent(tipPercent);
  this.update();
}

TipCalcView.prototype.clickRound = function(event){
  var direction = $(event.currentTarget).attr("data-round");

  var oldTotalAmount = this.preRoundAmount || this.tipCalc.totalAmount;
  var newTotalAmount = oldTotalAmount;

  this.preRoundAmount = oldTotalAmount;

  if (direction === "up"){
    newTotalAmount = Math.ceil(newTotalAmount);
    this.round = "up";
  } else {
    newTotalAmount = Math.floor(newTotalAmount);
    this.round = "down";
  }

  this.tipCalc.setTotalAmount(newTotalAmount);
  this.update();
}

TipCalcView.prototype.listen = function(){
  $("#input-bill").on("change", this.changeBillAmount.bind(this));
  $("#input-percent").on("change", this.changeTipPercent.bind(this));
  $("#input-tip").on("change", this.changeTipAmount.bind(this));
  $("#input-total").on("change", this.changeTotalAmount.bind(this));
  $(".percent-numbers").on("click", "button",  this.clickPercentNumbers.bind(this));
  $(".round").on("click", "button", this.clickRound.bind(this));
  $("#reset").on("click", this.clickReset.bind(this));
};


