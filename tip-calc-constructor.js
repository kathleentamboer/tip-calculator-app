var TipCalc = function(billAmount, tipAmount, tipPercent, totalAmount){
  this.billAmount = billAmount;
  this.tipAmount = tipAmount;
  this.tipPercent = tipPercent;
  this.totalAmount = totalAmount;
}

TipCalc.prototype.updateTotalAmount = function(){
  this.totalAmount = this.billAmount + this.tipAmount;
};

TipCalc.prototype.updateTipPercent = function(){
  if (this.billAmount === 0) {
    this.tipPercent = 0;
  } else {
    this.tipPercent = (this.tipAmount / this.billAmount) * 100;
  }
};

TipCalc.prototype.updateTipAmount = function(){
  this.tipAmount = (this.tipPercent / 100) * this.billAmount;
};

TipCalc.prototype.setBillAmount = function(amount){
  this.billAmount = amount;

  this.updateTipAmount();
  this.updateTotalAmount();
};

TipCalc.prototype.setTipAmount = function(amount){
  this.tipAmount = amount;

  this.updateTipPercent();
  this.updateTotalAmount();
};

TipCalc.prototype.setTipPercent = function(amount){
  this.tipPercent = amount;

  this.updateTipAmount();
  this.updateTotalAmount();
};

TipCalc.prototype.setTotalAmount = function(amount){
  if (this.billAmount === 0) {
    this.billAmount = amount;
    this.setTipAmount(0);

  } else {
    this.totalAmount = amount;
    this.tipAmount = this.totalAmount - this.billAmount;
    this.updateTipPercent();
  }
};