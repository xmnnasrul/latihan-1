import "./App.css";
import React from "react";
// BsDashCircleFill, BsPlusCircleFill
import { BsWallet2, BsBagDash } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import CreateModal from "./components/CreateModal";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      presentaseMoney: 0,
      moneyIncome: 0,
      moneyOut: 0,
      transakasiIn: 0,
      transaksiOut: 0,
      summary: [],
    };
    this.addItem = this.addItem.bind(this);
    this.fnCount = this.fnCount.bind(this);
  }

  addItem(objek) {
    let newData = [...this.state.summary, objek];
    let dataMoneyIn = newData.filter((item) => item.category === "IN");
    let moneyIn = dataMoneyIn.map((item) => item.nominal);
    let allMoneyIn = moneyIn.reduce((total, num) => total + num, 0);

    let dataMoneyOut = newData.filter((item) => item.category === "OUT");
    let moneyOut = dataMoneyOut.map((item) => item.nominal);
    let allMoneyOut = moneyOut.reduce((total, num) => total + num, 0);

    this.setState({
      moneyIncome: allMoneyIn,
      transakasiIn: moneyIn.length,
      moneyOut: allMoneyOut,
      transaksiOut: moneyOut.length,
      sisaUang: allMoneyIn - allMoneyOut,
      presentaseMoney: ((allMoneyIn - allMoneyOut) / allMoneyIn) * 100,
      summary: newData,
    });
  }

  fnCount() {
    let dataMoneyIn = this.state.summary.filter(
      (item) => item.category === "IN"
    );
    let moneyIn = dataMoneyIn.map((item) => item.nominal);
    let allMoneyIn = moneyIn.reduce((total, num) => total + num);

    let dataMoneyOut = this.state.summary.filter(
      (item) => item.category === "OUT"
    );
    let moneyOut = dataMoneyOut.map((item) => item.nominal);
    let allMoneyOut = moneyOut.reduce((total, num) => total + num);

    this.setState({
      moneyIncome: allMoneyIn,
      transakasiIn: moneyIn.length,
      moneyOut: allMoneyOut,
      transaksiOut: moneyOut.length,
      sisaUang: allMoneyIn - allMoneyOut,
      presentaseMoney: ((allMoneyIn - allMoneyOut) / allMoneyIn) * 100,
    });
  }

  componentDidMount() {
    if (this.state.summary.length < 1) {
    } else {
      this.fnCount();
    }
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="title-page">Testing Apps</h1>
              <hr className="mx-auto w-75" />
              <h2 className="fw-bold">Rp. {this.state.sisaUang},-</h2>
              <span className="title">
                sisa uang kamu tersisa {this.state.presentaseMoney}% lagi
              </span>
            </div>
          </div>

          <div className="row mt-4 mb-4">
            <div className="col-6">
              <div className="card-wrapper p-4">
                <div className="icon-wrapper mb-1">
                  <BsWallet2 />
                </div>
                <span className="title">pemasukan</span>
                <h3 className="fw-bold">RP. {this.state.moneyIncome},-</h3>
                <span className="title text-purple fw-bold">
                  {this.state.transakasiIn}
                </span>
                <span className="title"> transaksi</span>
              </div>
            </div>
            <div className="col-6">
              <div className="card-wrapper p-4">
                <div className="icon-wrapper mb-1">
                  <FaRegMoneyBillAlt />
                </div>
                <span className="title">pemasukan</span>
                <h3 className="fw-bold">RP. {this.state.moneyOut},-</h3>
                <span className="title text-purple fw-bold">
                  {this.state.transaksiOut}
                </span>
                <span className="title"> transaksi</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
              <h2>Ringkasan Transaksi</h2>
              <div className="wrapper-button d-flex">
                <CreateModal
                  category="IN"
                  action={this.addItem}
                  variant="btn btn-primary me-2"
                  text="Pemasukan"
                  head="Tambahkan Pemasukan"
                  button="primary"
                  class="btn btn-primary "
                />
                <CreateModal
                  category="OUT"
                  action={this.addItem}
                  variant="btn btn-danger"
                  text="Pengeluaran"
                  head="Tambahkan Pengeluaran"
                  button="danger"
                  class="btn btn-danger"
                />
              </div>
            </div>
          </div>

          <div className="row my-2">
            {this.state.summary.map((sum, index) => {
              return (
                <div
                  key={index}
                  className=" my-2 col-12 d-flex justify-content-between align-item-center"
                >
                  <div className="d-flex align-items-center h-100">
                    <div
                      className={
                        sum.category === "IN"
                          ? "icon-wrapper-in"
                          : "icon-wrapper-out"
                      }
                    >
                      {sum.category === "IN" ? <BsWallet2 /> : <BsBagDash />}
                    </div>
                    <div className="transaction ms-2 d-flex flex-column">
                      <h6>{sum.desc}</h6>
                      <span className="title">1{sum.date}</span>
                    </div>
                  </div>
                  <h5
                    className={
                      sum.category === "IN"
                        ? "money-in fw-bold"
                        : "money-out fw-bold"
                    }
                  >
                    Rp. {sum.nominal},-
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default App;
