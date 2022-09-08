<template>
  <div class="main-container">
    <div class="checkout-wrapp">
      <div class="step-area">
        <div class="step active">
          <div class="num"><span>1</span></div>
          <div class="txt">Delivery</div>
        </div>
        <div class="step active">
          <div class="num"><span>2</span></div>
          <div class="txt">Payment</div>
        </div>
        <div class="step active">
          <div class="num"><span>3</span></div>
          <div class="txt">Finish</div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 col-lg-9">
          <div class="thank-area">
            <div class="wrapp">
              <div class="head-title">
                <div class="heading"><span>Thank you</span></div>
              </div>
              <div class="orderid">Order ID : {{ id }}</div>
              <div class="desc">
                Your order will be delivered {{ shipment_est }} with
                {{ shipment_name }}
              </div>
              <a @click="goHome()" class="navigation">
                <img src="@/assets/img/icn-arrow-left.svg" alt="" />
                Go to homepage
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 col-lg-3">
          <div class="summary-wrapp">
            <div class="heading">Summary</div>
            <div class="desc">10 items purchased</div>
            <div class="list-item">
              <div class="txt">Delivery estimation</div>
              <div class="name">{{ shipment_est }} by {{ shipment_name }}</div>
            </div>
            <div class="list-item">
              <div class="txt">Payment method</div>
              <div class="name">{{ payment_name }}</div>
            </div>
            <div class="total-area">
              <div class="list">
                <div class="txt">Cost of goods</div>
                <div class="amount">{{ setRp(500000) }}</div>
              </div>
              <div class="list" v-if="is_dropship">
                <div class="txt">Dropshipping Fee</div>
                <div class="amount">{{ setRp(5900) }}</div>
              </div>
              <div class="list" v-if="is_shipment">
                <div class="txt">
                  <b>{{ shipment_name }}</b> shipment
                </div>
                <div class="amount">{{ setRp(shipment_amount) }}</div>
              </div>
              <div class="total">
                <div class="txt">Total</div>
                <div class="amount">{{ setRp(total_amount) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data: () => ({
    shipment: [
      {
        name: "GO-SEND",
        amount: 15000,
        est: "today",
      },
      {
        name: "JNE",
        amount: 9000,
        est: "2 days",
      },
      {
        name: "Personal Courier",
        amount: 29000,
        est: "1 day",
      },
    ],
    shipment_name: "GO-SEND",
    shipment_amount: 15000,
    shipment_est: "today",
    is_shipment: true,
    itemShip: "GO-SEND",
    payment: [
      { name: "e-Wallet" },
      { name: "Bank Transfer" },
      { name: "Virtual Account" },
    ],
    payment_name: "e-Wallet",
    itemPay: "e-Wallet",
    total_amount: "",
    is_dropship: "",
    drop_fee: 0,
    id: "",
  }),

  methods: {
    setRp(val) {
      let value = (val / 1).toFixed(0).replace(".", ",");
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    goHome() {
      window.localStorage.removeItem("total_amount");
      window.localStorage.removeItem("is_shipment");
      window.localStorage.removeItem("is_dropship");
      window.localStorage.removeItem("itemShip");
      window.localStorage.removeItem("payment_name");
      window.localStorage.removeItem("shipment_name");
      window.localStorage.removeItem("shipment_amount");
      window.localStorage.removeItem("itemPay");
      window.localStorage.removeItem("shipment_est");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("phone");
      window.localStorage.removeItem("address");
      window.localStorage.removeItem("drop_name");
      window.localStorage.removeItem("drop_phone");
      this.$router.push(`/`);
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    if (localStorage.is_shipment) this.is_shipment = localStorage.is_shipment;
    if (localStorage.itemShip) this.itemShip = localStorage.itemShip;
    if (localStorage.itemPay) this.itemPay = localStorage.itemPay;
    if (localStorage.shipment_name)
      this.shipment_name = localStorage.shipment_name;
    if (localStorage.shipment_amount)
      this.shipment_amount = localStorage.shipment_amount;
    if (localStorage.shipment_est)
      this.shipment_est = localStorage.shipment_est;
    if (localStorage.payment_name)
      this.payment_name = localStorage.payment_name;
    if (localStorage.total_amount)
      this.total_amount = localStorage.total_amount;
    if (localStorage.is_dropship) {
      if (localStorage.is_dropship == "true") {
        this.is_dropship = true;
        this.drop_fee = 5900;
      } else {
        this.is_dropship = false;
        this.drop_fee = 0;
      }
    }
    this.total_amount = parseInt(this.shipment_amount) + 500000 + this.drop_fee;
    window.localStorage.setItem("total_amount", this.total_amount);
  },
};
</script>

<style lang="scss" scoped>
$font: "Plus Jakarta Sans", sans-serif;
$heading: "Montserrat", sans-serif;
$main-color: #ff8a00;
$green-color: #1bd97b;
$desc-color: #2d2a40;

.main-container {
  background: #fffae6;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px 0;
  // padding: 100px;

  .checkout-wrapp {
    background: #fff;
    box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
    border-radius: 4px;
    padding: 100px 30px 80px;
    width: 90%;
    min-height: 80vh;
    position: relative;

    @media (min-width: 768px) {
      padding: 80px 60px 120px 50px;
    }

    .step-area {
      position: absolute;
      display: flex;
      align-items: center;
      background: #fffae6;
      border-radius: 35px;
      padding: 20px 30px;
      left: 50%;
      transform: translateX(-50%);
      top: -10px;
      .step {
        display: block;
        align-items: center;
        text-align: center;
        margin: 0 10px;

        .num {
          background: rgba(255, 136, 0, 0.217);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          position: relative;
          margin: auto;
          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: 500;
            font-size: 16px;
            color: #ff8a00;
          }
        }

        .txt {
          font-weight: 500;
          font-size: 16px;
          color: #ff8a00;
          padding-left: 8px;
        }
      }

      .step::after {
        color: $main-color;
        content: "\003E";
        font-weight: 600;
        padding: 0 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-top: -10px;
        margin-left: 20px;
      }

      .step:last-child::after {
        display: none;
      }

      .step.active {
        .num {
          background: $main-color;
          span {
            color: #fff;
          }
        }
      }

      @media (min-width: 768px) {
        padding: 20px 40px;
        top: -40px;

        .step {
          display: flex;
          align-items: center;
          margin: 0;
        }

        .step::after {
          position: relative;
          top: none;
          transform: none;
          margin-top: 0;
          margin-left: 0;
        }
      }
    }

    .thank-area {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
      padding-top: 24px;

      @media (min-width: 768px) {
        min-height: 431px;
        padding: 0;
      }

      .orderid {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        margin-bottom: 8px;
      }

      .desc {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        opacity: 0.6;
        margin-bottom: 40px;
      }

      .navigation {
        position: relative;
        font-size: 14px;
        font-weight: 500;
        color: #666666;

        img {
          width: 16px;
          margin-right: 4px;
          margin-bottom: -3px;
        }
      }

      .navigation:hover {
        color: $desc-color;
      }

      .head-title {
        margin-bottom: 24px;

        .checkbox {
          margin-top: 35px;
          margin-bottom: 10px;
          label {
            font-weight: 500;
            font-size: 14px;
            margin-left: 5px;
            color: #2d2a40;
          }
        }

        @media (min-width: 768px) {
          margin-bottom: 30px;
          margin-top: 0;

          .checkbox {
            margin: 0;
          }
        }
      }

      .heading {
        font-weight: 800;
        font-size: 28px;
        color: #ff8a00;
        position: relative;

        span {
          z-index: 2;
          position: relative;
        }
      }

      .heading::before {
        width: 270px;
        height: 8px;
        background: #eeeeee;
        content: "";
        position: absolute;
        left: 0;
        bottom: 4px;
        z-index: 1;
      }

      @media (min-width: 768px) {
        .heading {
          font-size: 36px;
          margin-top: 0;
        }

        .heading::before {
          width: 300px;
        }
      }
    }

    .summary-wrapp {
      border-top: 2px solid #ffe8cb;
      height: calc(100% + 90px);
      padding-top: 30px;
      position: relative;

      @media (min-width: 768px) {
        border: none;
        padding: 0;
        border-left: 2px solid #ffe8cb;
        padding-left: 30px;
        min-height: 431px;
      }

      .heading {
        font-weight: 700;
        font-size: 24px;
        color: #ff8a00;
        margin-bottom: 8px;
      }
      .desc {
        font-weight: 400;
        font-size: 14px;
        color: $desc-color;
        margin-bottom: 32px;
      }

      .list-item {
        padding-top: 16px;
        position: relative;
        padding-bottom: 16px;
        .txt {
          font-weight: 400;
          font-size: 14px;
          color: #000;
          margin-bottom: 3px;
        }
        .name {
          font-weight: 500;
          font-size: 16px;
          color: #1bd97b;
        }
      }

      .list-item::before {
        position: absolute;
        width: 80px;
        height: 1px;
        background: #d8d8d8;
        content: "";
        top: 0;
      }

      .total-area {
        width: 100%;

        @media (min-width: 768px) {
          position: absolute;
          bottom: 0;
        }

        .list {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          color: $desc-color;
          .txt {
            font-weight: 400;
            font-size: 14px;
          }
          .amount {
            font-weight: 700;
            font-size: 14px;
            color: #000;
          }
        }
        .total {
          font-family: $heading;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          margin-top: 20px;
          .txt {
            font-weight: 700;
            font-size: 24px;
            color: #ff8a00;
          }
          .amount {
            font-weight: 700;
            font-size: 24px;
            color: #ff8a00;
          }
        }
      }
    }

    .box-choice-area {
      margin-bottom: 60px;
      margin-top: 12px;

      @media (min-width: 768px) {
        margin-top: 0;
      }
    }
    .box-choice {
      color: #817e8c;
      background: #ffffff;
      border: 1px solid #cccccc;
      padding: 15px;
      margin-bottom: 16px;
      cursor: pointer;
      position: relative;

      .name {
        font-weight: 500;
        font-size: 13px;
        margin-bottom: 4px;
      }
      .amount {
        font-weight: 700;
        font-size: 16px;
      }
      .name-one {
        font-weight: 500;
        font-size: 16px;
      }
      .icn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .box-choice.one {
      padding: 25.5px 15px;
    }

    .box-choice.select {
      color: #000;
      background: rgba(27, 217, 123, 0.1);
      border: 2px solid #1bd97b;
    }
  }
}
</style>
