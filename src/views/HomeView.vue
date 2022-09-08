<template>
  <div class="main-container">
    <div
      class="alert-notif"
      :class="{ danger: notifdanger, success: notifsuccess }"
    >
      {{ textNotif }}
    </div>
    <div class="checkout-wrapp">
      <div class="step-area">
        <div class="step active">
          <div class="num"><span>1</span></div>
          <div class="txt">Delivery</div>
        </div>
        <div class="step">
          <div class="num"><span>2</span></div>
          <div class="txt">Payment</div>
        </div>
        <div class="step">
          <div class="num"><span>3</span></div>
          <div class="txt">Finish</div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 col-lg-9">
          <div class="form-wrapp">
            <router-link to="/" class="navigation">
              <img src="@/assets/img/icn-arrow-left.svg" alt="" />
              Back to Cart
            </router-link>
            <div class="head-title">
              <div class="heading"><span>Delivery details</span></div>
              <div class="checkbox">
                <input
                  type="checkbox"
                  v-model="is_dropship"
                  @click="isDropshipper()"
                />
                <label for="vehicle1">Send as dropshipper</label><br />
              </div>
            </div>
            <form>
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="input-area">
                    <input
                      type="text"
                      class="f-input"
                      required=""
                      v-model="email"
                      :class="{
                        valid: valid.email == 0,
                        error: valid.email == 2,
                      }"
                    />
                    <div class="label">Email</div>
                    <div class="txt-help">{{ msg.email }}</div>
                    <img
                      src="@/assets/img/icn-check.svg"
                      alt=""
                      class="icn"
                      v-if="valid.email == 0"
                    />
                    <img
                      src="@/assets/img/icn-close.svg"
                      alt=""
                      class="icn"
                      v-if="valid.email == 2"
                    />
                  </div>
                  <div class="input-area">
                    <input
                      type="text"
                      class="f-input"
                      required=""
                      v-model="phone"
                      :class="{
                        valid: valid.phone == 0,
                        error: valid.phone == 2,
                      }"
                    />
                    <div class="label">Phone Number</div>
                    <div class="txt-help">{{ msg.phone }}</div>
                    <img
                      src="@/assets/img/icn-check.svg"
                      alt=""
                      class="icn"
                      v-if="valid.phone == 0"
                    />
                    <img
                      src="@/assets/img/icn-close.svg"
                      alt=""
                      class="icn"
                      v-if="valid.phone == 2"
                    />
                  </div>
                  <div class="input-area">
                    <textarea
                      rows="4"
                      class="f-input"
                      required=""
                      v-model="address"
                      :class="{
                        valid: valid.address == 0,
                        error: valid.address == 2,
                      }"
                      maxlength="150"
                    ></textarea>
                    <div class="label">Delivery Address</div>
                    <div class="count">{{ count }} / 150</div>
                    <div class="txt-help">{{ msg.address }}</div>
                    <img
                      src="@/assets/img/icn-check.svg"
                      alt=""
                      class="icn"
                      v-if="valid.address == 0"
                    />
                    <img
                      src="@/assets/img/icn-close.svg"
                      alt=""
                      class="icn"
                      v-if="valid.address == 2"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="input-area">
                    <input
                      type="text"
                      class="f-input"
                      required=""
                      v-model="drop_name"
                      :disabled="is_dropship == false"
                      :class="{
                        valid: valid.drop_name == 0,
                        error: valid.drop_name == 2,
                      }"
                    />
                    <div class="label">Dropshipper name</div>
                    <div class="txt-help">{{ msg.drop_name }}</div>
                    <img
                      src="@/assets/img/icn-check.svg"
                      alt=""
                      class="icn"
                      v-if="valid.drop_name == 0"
                    />
                    <img
                      src="@/assets/img/icn-close.svg"
                      alt=""
                      class="icn"
                      v-if="valid.drop_name == 2"
                    />
                  </div>
                  <div class="input-area">
                    <input
                      type="text"
                      class="f-input"
                      required=""
                      v-model="drop_phone"
                      :disabled="is_dropship == false"
                      :class="{
                        valid: valid.drop_phone == 0,
                        error: valid.drop_phone == 2,
                      }"
                    />
                    <div class="label">Dropshipper phone number</div>
                    <div class="txt-help">{{ msg.drop_phone }}</div>
                    <img
                      src="@/assets/img/icn-check.svg"
                      alt=""
                      class="icn"
                      v-if="valid.drop_phone == 0"
                    />
                    <img
                      src="@/assets/img/icn-close.svg"
                      alt=""
                      class="icn"
                      v-if="valid.drop_phone == 2"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-12 col-md-4 col-lg-3">
          <div class="summary-wrapp">
            <div class="heading">Summary</div>
            <div class="desc">10 items purchased</div>
            <div class="total-area">
              <div class="list">
                <div class="txt">Cost of goods</div>
                <div class="amount">{{ setRp(500000) }}</div>
              </div>
              <div class="list" v-if="is_dropship">
                <div class="txt">Dropshipping Fee</div>
                <div class="amount">{{ setRp(5900) }}</div>
              </div>
              <div class="total">
                <div class="txt">Total</div>
                <div class="amount">{{ setRp(total_amount) }}</div>
              </div>
              <div class="cta">
                <a @click="continuePay()" class="btn btn-primary"
                  >Continue to Payment</a
                >
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
    email: null,
    phone: null,
    address: null,
    drop_name: null,
    drop_phone: null,
    is_dropship: false,
    total_amount: 500000,
    typingTimer: 0,
    valid: [],
    msg: [],
    maxCharacters: 150,
    count: 0,
    // notif
    notifsuccess: false,
    notifdanger: false,
    textNotif: "",
  }),
  watch: {
    email(value) {
      this.email = value;
      if (this.email == null) {
        this.msg["email"] = "Email is required";
        this.valid["email"] = 1;
      } else if (this.email == "") {
        this.valid["email"] = 2;
        this.msg["email"] = "Email is required";
      } else {
        if (!/.+@.+\..+/.test(value)) {
          this.msg["email"] = "Email is not valid";
          this.valid["email"] = 2;
        } else {
          this.valid["email"] = 0;
          this.msg["email"] = "";
        }
      }
    },
    phone(value) {
      this.phone = value;
      this.phone = this.phone.replace(/[^+.0-9.:]/g, "");
      if (this.phone == null) {
        this.msg["phone"] = "Phone is required";
        this.valid["phone"] = 1;
      } else if (this.phone == "") {
        this.valid["phone"] = 2;
        this.msg["phone"] = "Phone is required";
      } else {
        if (value.length >= 6 && value.length <= 20) {
          this.valid["phone"] = 0;
          this.msg["phone"] = "";
        } else {
          this.valid["phone"] = 2;
          this.msg["phone"] = "Phone should be above 6 - 20 number";
        }
      }
    },
    drop_phone(value) {
      this.drop_phone = value;
      this.drop_phone = this.drop_phone.replace(/[^+.0-9.:]/g, "");
      if (this.drop_phone == null) {
        this.msg["drop_phone"] = "Dropshipper phone is required";
        this.valid["drop_phone"] = 1;
      } else if (this.drop_phone == "") {
        this.valid["drop_phone"] = 2;
        this.msg["drop_phone"] = "Dropshipper phone is required";
      } else {
        if (value.length >= 6 && value.length <= 20) {
          this.valid["drop_phone"] = 0;
          this.msg["drop_phone"] = "";
        } else {
          this.valid["drop_phone"] = 2;
          this.msg["drop_phone"] =
            "Dropshipper phone should be above 6 - 20 number";
        }
      }
    },
    drop_name(value) {
      this.drop_name = value;
      if (this.drop_name == null) {
        this.valid["drop_name"] = 1;
      } else if (this.drop_name == "") {
        this.valid["drop_name"] = 2;
        this.msg["drop_name"] = "Dropshipper name is required";
      } else {
        this.valid["drop_name"] = 0;
      }
    },
    address(value) {
      this.address = value;
      this.count = this.address.length;
      if (this.address == null) {
        this.msg["address"] = "Address is required";
        this.valid["address"] = 1;
      } else if (this.address == "") {
        this.valid["address"] = 2;
        this.msg["address"] = "Address is required";
      } else {
        this.valid["address"] = 0;
      }
    },
  },
  methods: {
    setRp(val) {
      let value = (val / 1).toFixed(0).replace(".", ",");
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    isDropshipper() {
      if (this.is_dropship) {
        this.is_dropship = false;
        this.total_amount = 500000;
        this.drop_name = null;
        this.drop_phone = null;
        this.valid.drop_phone = 1;
        this.msg.drop_phone = "";
        window.localStorage.setItem("is_dropship", this.is_dropship);
        window.localStorage.setItem("total_amount", this.total_amount);
      } else {
        this.is_dropship = true;
        this.total_amount = 500000 + 5900;
        window.localStorage.setItem("is_dropship", this.is_dropship);
        window.localStorage.setItem("total_amount", this.total_amount);
      }
    },
    continuePay() {
      if (
        !this.email ||
        this.valid.email == 2 ||
        !this.phone ||
        this.valid.phone == 2 ||
        !this.address ||
        this.valid.address == 2
      ) {
        this.alert("Data is required / Data is not valid", "danger");
      } else {
        if (this.is_dropship) {
          if (
            !this.drop_name ||
            this.valid.drop_name == 2 ||
            !this.drop_phone ||
            this.valid.drop_phone == 2
          ) {
            this.alert("Data is required / Data is not valid", "danger");
          } else {
            window.localStorage.setItem("email", this.email);
            window.localStorage.setItem("phone", this.phone);
            window.localStorage.setItem("address", this.address);
            window.localStorage.setItem("drop_name", this.drop_name);
            window.localStorage.setItem("drop_phone", this.drop_phone);
            this.$router.push(`/payment`);
          }
        } else {
          window.localStorage.setItem("email", this.email);
          window.localStorage.setItem("phone", this.phone);
          window.localStorage.setItem("address", this.address);
          window.localStorage.setItem("drop_name", this.drop_name);
          window.localStorage.setItem("drop_phone", this.drop_phone);
          this.$router.push(`/payment`);
        }
      }
    },
    alert(item, group) {
      if (group == "success") {
        this.notifsuccess = true;
      } else {
        this.notifdanger = true;
      }
      this.textNotif = item;
      setTimeout(() => {
        this.notifsuccess = false;
        this.notifdanger = false;
      }, 3000);
    },
  },
  mounted() {
    if (localStorage.total_amount) {
      this.total_amount = localStorage.total_amount;
    } else {
      window.localStorage.setItem("total_amount", this.total_amount);
    }
    if (localStorage.is_dropship) {
      localStorage.is_dropship == "true"
        ? (this.is_dropship = true)
        : (this.is_dropship = false);
    } else {
      window.localStorage.setItem("is_dropship", this.is_dropship);
    }
    if (localStorage.email) this.email = localStorage.email;
    if (localStorage.phone) this.phone = localStorage.phone;
    if (localStorage.address) this.address = localStorage.address;
    if (!(localStorage.drop_name == "null"))
      this.drop_name = localStorage.drop_name;
    if (!(localStorage.drop_phone == "null"))
      this.drop_phone = localStorage.drop_phone;
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

    .form-wrapp {
      position: relative;

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
        margin-top: 24px;

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
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
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
        .navigation {
          position: absolute;
          top: -40px;
          font-size: 14px;
          font-weight: 500;
          color: #666666;

          img {
            width: 16px;
            margin-right: 4px;
            margin-bottom: -3px;
          }
        }

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
  }
}
</style>
