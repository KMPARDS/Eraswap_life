<script>
    import Navbar from './NavBar.svelte'
    import Footer from './Footer.svelte'
    let size = 128;
    function get_query(name){
       if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
          return decodeURIComponent(name[1]);
    }
    try{
    refer = get_query("refer").toLowerCase();}catch(e){
    }
</script>
   
    <div class="content content-fixed">
      <div class="container-fluid pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
          <div>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-style1 mg-b-10">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Sales Monitoring</li>
              </ol>
            </nav>
            <h4 class="mg-b-0 tx-spacing--1">Welcome to Dashboard</h4>
          </div>
          <div class="d-none d-md-block">
            <button class="btn btn-sm pd-x-15 btn-white btn-uppercase"><i data-feather="mail" class="wd-10 mg-r-5"></i> Email</button>
            <button class="btn btn-sm pd-x-15 btn-white btn-uppercase mg-l-5"><i data-feather="printer" class="wd-10 mg-r-5"></i> Print</button>
            <button class="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"><i data-feather="file" class="wd-10 mg-r-5"></i> Generate Report</button>
          </div>
        </div>

        <div class="row row-xs">
          <div class="col-sm-6 col-lg-2">
            <div class="card card-body">
              <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Total EST</h6>
              <div class="d-flex d-lg-block d-xl-flex align-items-end">
                <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">0.81%</h3>
              </div>
              <div class="chart-three">
                  <div id="flotChart6" class="flot-chart ht-30"></div>
                </div><!-- chart-three -->
            </div>
          </div><!-- col -->
          <div class="col-sm-6 col-lg-2">
            <div class="card card-body">
              <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Total EST Shared</h6>
              <div class="d-flex d-lg-block d-xl-flex align-items-end">
                <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">0.81%</h3>
              </div>
              <div class="chart-three">
                  <div id="flotChart7" class="flot-chart ht-30"></div>
                </div><!-- chart-three -->
            </div>
          </div><!-- col -->
          <div class="col-sm-6 col-lg-2">
            <div class="card card-body">
              <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Available EST</h6>
              <div class="d-flex d-lg-block d-xl-flex align-items-end">
                <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">0.81%</h3>
              </div>
              <div class="chart-three">
                  <div id="flotChartAvailableEST" class="flot-chart ht-30"></div>
                </div><!-- chart-three -->
            </div>
          </div><!-- col -->
          <div class="col-sm-6 col-lg-2 mg-t-10 mg-sm-t-0">
            <div class="card card-body">
              <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">EST Cap</h6>
              <div class="d-flex d-lg-block d-xl-flex align-items-end">
                <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">3,137</h3>
              </div>
              <div class="chart-three">
                  <div id="flotChart4" class="flot-chart ht-30"></div>
                </div><!-- chart-three -->
            </div>
          </div><!-- col -->
          <div class="col-sm-6 col-lg-2 mg-t-10 mg-lg-t-0">
            <div class="card card-body">
              <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">My Order</h6>
              <div class="d-flex d-lg-block d-xl-flex align-items-end">
                <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">$306.20</h3>
              </div>
              <div class="chart-three">
                  <div id="flotChart5" class="flot-chart ht-30"></div>
                </div><!-- chart-three -->
            </div>
          </div><!-- col -->
          <div class="col-sm-6 col-lg-2 mg-t-10 mg-lg-t-0">
            <div class="card card-body">
              <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Track Order</h6>
              <div class="d-flex d-lg-block d-xl-flex align-items-end">
                <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">1,650</h3>
              </div>
              <div class="chart-three">
                  <div id="flotChart8" class="flot-chart ht-30"></div>
                </div><!-- chart-three -->
            </div>
          </div><!-- col -->
          <div class="col-sm-6 col-lg-2 mg-t-10">
              <div class="card card-body">
                <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Cancel & Restart Order</h6>
                <div class="d-flex d-lg-block d-xl-flex align-items-end">
                  <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">0.81%</h3>
                </div>
                <div class="chart-three">
                    <div id="flotChart9" class="flot-chart ht-30"></div>
                  </div><!-- chart-three -->
              </div>
            </div><!-- col -->
            <div class="col-sm-6 col-lg-2 mg-t-10">
              <div class="card card-body">
                <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">100 Power Token Received</h6>
                <div class="d-flex d-lg-block d-xl-flex align-items-end">
                  <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">0.81%</h3>
                </div>
                <div class="chart-three">
                    <div id="flotChart110" class="flot-chart ht-30"></div>
                  </div><!-- chart-three -->
              </div>
            </div><!-- col -->
            <div class="col-sm-6 col-lg-2 mg-t-10">
              <div class="card card-body">
                <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">50 Power Token Shared</h6>
                <div class="d-flex d-lg-block d-xl-flex align-items-end">
                  <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">0.81%</h3>
                </div>
                <div class="chart-three">
                    <div id="flotChart120" class="flot-chart ht-30"></div>
                  </div><!-- chart-three -->
              </div>
            </div><!-- col -->
            <div class="col-sm-6 col-lg-2 mg-t-10">
              <div class="card card-body">
                <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">50 Power Token Burnt </h6>
                <div class="d-flex d-lg-block d-xl-flex align-items-end">
                  <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">3,137</h3>
                </div>
                <div class="chart-three">
                    <div id="flotChart4" class="flot-chart ht-30"></div>
                  </div><!-- chart-three -->
              </div>
            </div><!-- col -->
            <div class="col-sm-6 col-lg-2 mg-t-10">
              <div class="card card-body">
                <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Day Swappers Level</h6>
                <div class="d-flex d-lg-block d-xl-flex align-items-end">
                  <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">$306.20</h3>
                </div>
                <div class="chart-three">
                    <div id="flotChart5" class="flot-chart ht-30"></div>
                  </div><!-- chart-three -->
              </div>
            </div><!-- col -->
            <div class="col-sm-6 col-lg-2 mg-t-10">
              <div class="card card-body">
                <h6 class="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">TimeAlly</h6>
                <div class="d-flex d-lg-block d-xl-flex align-items-end">
                  <h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">1,650</h3>
                </div>
                <div class="chart-three">
                    <div id="flotChart8" class="flot-chart ht-30"></div>
                  </div><!-- chart-three -->
              </div>
            </div><!-- col -->
        
          <div class="col-12 mg-t-10">
            <div class="card">
              <div class="card-header">
                <h5 class="mg-b-0">1 ES <img src="images/S_LIFE.png" height="24px" alt="S_LIFE"></h5>
              </div><!-- card-header -->
              <div class="card-body pd-0">
                <div class="row no-gutters">
                  <div class="col col-sm-6 col-lg">
                    <div class="crypto">
                      <div class="media mg-b-10">
                        <div class="crypto-icon bg-secondary">
                          <i class="cf cf-eth"></i>
                        </div><!-- crypto-icon -->
                        <div class="media-body pd-l-8">
                          <h6 class="tx-11 tx-spacing-1 tx-uppercase tx-semibold mg-b-5">Ethereum <span class="tx-color-03 tx-normal">(ETH)</span></h6>
                          <div class="d-flex align-items-baseline tx-rubik">
                            <h5 class="tx-20 mg-b-0" id="ether-price-usd">Loading...</h5>
                            <p class="mg-b-0 tx-11 tx-danger mg-l-3"><i class="icon ion-md-arrow-down"></i> 0.77%</p>
                          </div>
                        </div><!-- media-body -->
                      </div><!-- media -->

                      <div class="chart-twelve">
                        <div id="flotChart2" class="flot-chart"></div>
                      </div><!-- chart-twelve -->

                      <div class="pos-absolute b-5 l-20 tx-medium">
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03">
                          <a href="" class="link-01 tx-semibold">12</a> USD Markets
                        </label>
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03 mg-l-10">
                          <a href="" class="link-01 tx-semibold">81</a> ETH Markets
                        </label>
                      </div>
                    </div><!-- crypto -->
                  </div>
                  <div class="col col-sm-6 col-lg bd-t bd-sm-t-0 bd-sm-l">
                    <div class="crypto">
                      <div class="media mg-b-10">
                        <div class="crypto-bitcoin-cash"><i class="fab fa-bitcoin tx-success tx-42"></i></div>
                        <div class="media-body pd-l-8">
                          <h6 class="tx-11 tx-spacing-1 tx-uppercase tx-semibold mg-b-5">Bitcoin <span class="tx-color-03 tx-normal">(BTC)</span></h6>
                          <div class="d-flex align-items-baseline tx-rubik">
                            <h5 class="tx-20 mg-b-0" id="bitcoin-price-usd">Loading...</h5>
                            <p class="mg-b-0 tx-11 tx-success mg-l-3"><i class="icon ion-md-arrow-up"></i> 4.34%</p>
                          </div>
                        </div><!-- media-body -->
                      </div><!-- media -->

                      <div class="chart-twelve">
                        <div id="flotChartBTCCash" class="flot-chart"></div>
                      </div><!-- chart-twelve -->

                      <div class="pos-absolute b-5 l-20 tx-medium">
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03">
                          <a href="" class="link-01 tx-semibold">11</a> USD Markets
                        </label>
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03 mg-l-10">
                          <a href="" class="link-01 tx-semibold">74</a> BCH Markets
                        </label>
                      </div>
                    </div><!-- crypto -->
                  </div>
                  <div class="col col-sm-6 col-lg bd-t bd-lg-t-0 bd-lg-l">
                    <div class="crypto">
                      <div class="media mg-b-10">
                        <div class="crypto-icon bg-litecoin">
                          <i class="cf cf-ltc"></i>
                        </div><!-- crypto-icon -->
                        <div class="media-body pd-l-8">
                          <h6 class="tx-11 tx-spacing-1 tx-uppercase tx-semibold mg-b-5">LTC</h6>
                          <div class="d-flex align-items-baseline tx-rubik">
                            <h5 class="tx-20 mg-b-0" id="ltc-price-usd">Loading...</h5>
                            <p class="mg-b-0 tx-11 tx-danger mg-l-3"><i class="icon ion-md-arrow-down"></i> 2.17%</p>
                          </div>
                        </div><!-- media-body -->
                      </div><!-- media -->

                      <div class="chart-twelve">
                        <div id="flotChart4" class="flot-chart"></div>
                      </div><!-- chart-twelve -->

                      <div class="pos-absolute b-5 l-20 tx-medium">
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03">
                          <a href="" class="link-01 tx-semibold">6</a> USD Markets
                        </label>
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03 mg-l-10">
                          <a href="" class="link-01 tx-semibold">42</a> LTC Markets
                        </label>
                      </div>
                    </div><!-- crypto -->
                  </div>
                  <div class="col col-sm-6 col-lg bd-t bd-lg-t-0 bd-sm-l">
                    <div class="crypto">
                      <div class="media mg-b-10">
                        <div class="crypto-icon bg-primary">
                          <i class="cf cf-dash"></i>
                        </div><!-- crypto-icon -->
                        <div class="media-body pd-l-8">
                          <h6 class="tx-11 tx-spacing-1 tx-uppercase tx-semibold mg-b-5">INR</h6>
                          <div class="d-flex align-items-baseline tx-rubik">
                            <h5 class="tx-20 mg-b-0">$90.53</h5>
                            <p class="mg-b-0 tx-11 tx-danger mg-l-3"><i class="icon ion-md-arrow-down"></i> 0.80%</p>
                          </div>
                        </div><!-- media-body -->
                      </div><!-- media -->

                      <div class="chart-twelve">
                        <div id="flotChart5" class="flot-chart"></div>
                      </div><!-- chart-twelve -->

                      <div class="pos-absolute b-5 l-20 tx-medium">
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03">
                          <a href="" class="link-01 tx-semibold">6</a> USD Markets
                        </label>
                        <label class="tx-9 tx-uppercase tx-sans tx-color-03 mg-l-10">
                          <a href="" class="link-01 tx-semibold">31</a> DASH Markets
                        </label>
                      </div>
                    </div><!-- crypto -->
                  </div>
                </div><!-- row -->
              </div><!-- card-body -->
            </div><!-- card -->
          </div><!-- col -->
          <div class="col-lg-4 col-xl-4 mg-t-10">
            <div class="card">
              <div class="card-header pd-y-20 d-md-flex align-items-center justify-content-between">
                <h6 class="mg-b-0">All Platform Earnings</h6>                
              </div><!-- card-header -->
              <div class="card-body pos-relative pd-0">
               
                <div data-label="Example" class="df-example">
                  <div class="ht-100 ht-lg-200"><canvas id="chartBar2"></canvas></div>
                </div><!-- df-example -->
              </div><!-- card-body -->
            </div><!-- card -->
          </div>
          <div class="col-4 col-md-4 col-lg-4 mg-t-10">
            <div class="card">
              <div class="card-header">
                <h6 class="lh-5 mg-b-5">Top 5 Use Services</h6>                
              </div><!-- card-header -->
              <div class="card-body pd-0">               
                <div class="list-group list-group-flush tx-13">
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">5.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">4,230</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">58%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">4.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">1,416</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">24%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">3.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">980</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">16%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">2.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">401</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">8%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center bg-transparent">
                    <strong class="tx-12 tx-rubik">1.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">798</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">12%</div>
                  </div>
                </div><!-- list-group -->
              </div><!-- card-body -->
            </div><!-- card -->
          </div><!-- col -->
          <div class="col-4 col-md-4 col-lg-4 mg-t-10">
            <div class="card">
              <div class="card-header">
                <h6 class="lh-5 mg-b-5">Top 5 Freelancers</h6>                
              </div><!-- card-header -->
              <div class="card-body pd-0">               
                <div class="list-group list-group-flush tx-13">
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">5.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">4,230</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">58%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">4.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">1,416</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">24%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">3.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">980</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">16%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center">
                    <strong class="tx-12 tx-rubik">2.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      <i class="icon fa fa-star lh-0 tx-gray-300"></i>
                      
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">401</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">8%</div>
                  </div>
                  <div class="list-group-item pd-y-5 pd-x-20 d-flex align-items-center bg-transparent">
                    <strong class="tx-12 tx-rubik">1.0</strong>
                    <div class="tx-16 mg-l-10">
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star  lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                      <i class="icon fa fa-star lh-0 tx-orange"></i>
                    </div>
                    <div class="mg-l-auto tx-rubik tx-color-02">798</div>
                    <div class="mg-l-20 tx-rubik tx-color-03 wd-10p text-right">12%</div>
                  </div>
                </div><!-- list-group -->
              </div><!-- card-body -->
            </div><!-- card -->
          </div><!-- col -->
        
          <div class="col-md-3 col-xl-4 mg-t-10">
              <div class="card">
                  <div class="card-header d-flex justify-content-between">
                    <h6 class="lh-5 mg-b-0">Total ES available in Luck Pool</h6>
                  </div><!-- card-header -->
                  <div class="card-body pd-y-25">
                    <div class="row">
                      <div class="col-12">
                        <div class="chart-thirteen"><canvas id="chartDonut2"></canvas></div>
                      </div>
                      <div class="col-12 tx-12 mg-t-40">
                          <div class="d-flex align-items-center">
                              <div class="wd-10 ht-10 bg-primary rounded-circle pos-relative t--1"></div>
                              <span class="tx-medium mg-l-10">By Ad Revenue</span>
                              <span class="tx-rubik mg-l-auto">4,024.52</span>
                              <span class="wd-60 tx-right tx-rubik mg-l-5 tx-success">0.96% <i class="icon fa fa-long-arrow-down"></i></span>
                            </div>
                            <div class="d-flex align-items-center mg-t-10">
                              <div class="wd-10 ht-10 bg-teal rounded-circle pos-relative t--1"></div>
                              <span class="tx-medium mg-l-10">By Seller Verification</span>
                              <span class="tx-rubik mg-l-auto">3,539.23</span>
                              <span class="wd-60 tx-right tx-rubik mg-l-5 tx-success">0.75% <i class="icon fa fa-long-arrow-up"></i></span>
                            </div>
                            <div class="d-flex align-items-center mg-t-10">
                              <div class="wd-10 ht-10 bg-warning rounded-circle pos-relative t--1"></div>
                              <span class="tx-medium mg-l-10">By TimeAlly Loan Interest</span>
                              <span class="tx-rubik mg-l-auto">27,499.4</span>
                              <span class="wd-60 tx-right tx-rubik mg-l-5 tx-danger">-0.58% <i class="icon fa fa-long-arrow-down"></i></span>
                            </div>
                            <div class="d-flex align-items-center mg-t-10">
                                <div class="wd-10 ht-10 bg-warning rounded-circle pos-relative t--1"></div>
                                <span class="tx-medium mg-l-10">By 1 Year remaining stakes</span>
                                <span class="tx-rubik mg-l-auto">27,499.4</span>
                                <span class="wd-60 tx-right tx-rubik mg-l-5 tx-danger">-0.58% <i class="icon fa fa-long-arrow-down"></i></span>
                              </div>
                          </div>
                    </div>
                  </div><!-- card-body -->
                </div><!-- card -->
          </div>
          <div class="col-md-3 col-xl-4 mg-t-10">
              <div class="card">
                  <div class="card-header d-flex justify-content-between">
                    <h6 class="lh-5 mg-b-0">Total ES available in NRT</h6>
                  </div><!-- card-header -->
                  <div class="card-body pd-y-25">
                    <div class="row">
                      <div class="col-12">
                        <div class="chart-thirteen"><canvas id="chartDonuts"></canvas></div>
                      </div>
                      <div class="col-12 tx-12 mg-t-40">
                        <div class="d-flex align-items-center">
                          <div class="wd-10 ht-10 bg-primary rounded-circle pos-relative t--1"></div>
                          <span class="tx-medium mg-l-10">By Ad Revenue</span>
                          <span class="tx-rubik mg-l-auto">4,024.52</span>
                          <span class="wd-60 tx-right tx-rubik mg-l-5 tx-success">0.96% <i class="icon fa fa-long-arrow-down"></i></span>
                        </div>
                        <div class="d-flex align-items-center mg-t-10">
                          <div class="wd-10 ht-10 bg-teal rounded-circle pos-relative t--1"></div>
                          <span class="tx-medium mg-l-10">By Seller Verification</span>
                          <span class="tx-rubik mg-l-auto">3,539.23</span>
                          <span class="wd-60 tx-right tx-rubik mg-l-5 tx-success">0.75% <i class="icon fa fa-long-arrow-up"></i></span>
                        </div>
                        <div class="d-flex align-items-center mg-t-10">
                          <div class="wd-10 ht-10 bg-warning rounded-circle pos-relative t--1"></div>
                          <span class="tx-medium mg-l-10">By TimeAlly Loan Interest</span>
                          <span class="tx-rubik mg-l-auto">27,499.4</span>
                          <span class="wd-60 tx-right tx-rubik mg-l-5 tx-danger">-0.58% <i class="icon fa fa-long-arrow-down"></i></span>
                        </div>
                        <div class="d-flex align-items-center mg-t-10">
                            <div class="wd-10 ht-10 bg-warning rounded-circle pos-relative t--1"></div>
                            <span class="tx-medium mg-l-10">By 1 Year remaining stakes</span>
                            <span class="tx-rubik mg-l-auto">27,499.4</span>
                            <span class="wd-60 tx-right tx-rubik mg-l-5 tx-danger">-0.58% <i class="icon fa fa-long-arrow-down"></i></span>
                          </div>
                      </div>
                    </div>
                  </div><!-- card-body -->
                </div><!-- card -->
          </div>          
          <div class="col-md-6 col-xl-4 mg-t-10">
              <div class="card">
                  <div class="card-header pd-b-0 pd-t-20 bd-b-0">
                    <h6 class="mg-b-0">Swapper Wall</h6>
                  </div><!-- card-header -->
                  <div class="card-body pd-y-10">
                    <div class="d-flex align-items-baseline tx-rubik">
                      <h1 class="tx-40 lh-1 tx-normal tx-spacing--2 mg-b-5 mg-r-5">9.8</h1>
                      <p class="tx-11 tx-color-03 mg-b-0"><span class="tx-medium tx-success">1.6% <i class="icon ion-md-arrow-up"></i></span></p>
                    </div>
                    <h6 class="tx-uppercase tx-spacing-1 tx-semibold tx-10 tx-color-02 mg-b-15">Performance Score</h6>
  
                    <div class="progress bg-transparent ht-10 mg-b-15">
                      <div class="progress-bar bg-primary wd-50p" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                      <div class="progress-bar bg-success wd-25p bd-l bd-white" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                      <div class="progress-bar bg-warning wd-5p bd-l bd-white" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                      <div class="progress-bar bg-pink wd-5p bd-l bd-white" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                      <div class="progress-bar bg-teal wd-10p bd-l bd-white" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      <div class="progress-bar bg-purple wd-5p bd-l bd-white" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
  
                    <table class="table-dashboard-two">
                      <tbody>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-primary"></div></td>
                          <td class="tx-medium">Messages</td>
                          <td class="text-right">3,007</td>
                          <td class="text-right">50%</td>
                        </tr>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-success"></div></td>
                          <td class="tx-medium">Notifications</td>
                          <td class="text-right">1,674</td>
                          <td class="text-right">25%</td>
                        </tr>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-warning"></div></td>
                          <td class="tx-medium">Friends</td>
                          <td class="text-right">125</td>
                          <td class="text-right">6%</td>
                        </tr>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-pink"></div></td>
                          <td class="tx-medium">Photos</td>
                          <td class="text-right">98</td>
                          <td class="text-right">5%</td>
                        </tr>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-teal"></div></td>
                          <td class="tx-medium">Videos</td>
                          <td class="text-right">512</td>
                          <td class="text-right">10%</td>
                        </tr>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-purple"></div></td>
                          <td class="tx-medium">Groups</td>
                          <td class="text-right">81</td>
                          <td class="text-right">4%</td>
                        </tr>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-purple"></div></td>
                          <td class="tx-medium">Community</td>
                          <td class="text-right">81</td>
                          <td class="text-right">4%</td>
                        </tr>
                        <tr>
                          <td><div class="wd-12 ht-12 rounded-circle bd bd-3 bd-purple"></div></td>
                          <td class="tx-medium">Pages</td>
                          <td class="text-right">81</td>
                          <td class="text-right">4%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div><!-- card-body -->
                </div><!-- card -->
          </div>
          <div class="col-md-6 col-xl-4 mg-t-10">
              <div class="card">
                  <div class="card-header d-flex justify-content-between">
                    <h6 class="lh-5 mg-b-0">Total ES Burn in all platform</h6>
                    <div class="d-flex mg-t-20 mg-sm-t-0">
                        <div class="btn-group flex-fill">
                          <button class="btn btn-white btn-xs active" style="color:#661111; font-size: 13px">Month</button>
                          <button class="btn btn-white btn-xs" style="color:#661111; font-size: 13px">Year</button>
                        </div>
                      </div>
                  </div><!-- card-header -->
                  <div class="card-body pd-0 pos-relative">
                    <div class="pos-absolute t-20 l-20">
                      <p class="tx-uppercase tx-11 tx-spacing-1 tx-color-03 tx-medium mg-b-0">Total Balance</p>
                      <div class="d-flex align-items-baseline">
                        <h2 class="tx-normal tx-rubik tx-spacing--2 mg-b-0"><small class="tx-color-03">$</small> 7,429.97</h2>
                        <span class="tx-rubik tx-success mg-l-5"><i class="icon ion-md-arrow-up"></i> 60 (2.45%)</span>
                      </div>
                    </div>
                    <div class="chart-fourteen">
                      <div id="flotChart18" class="flot-chart"></div>
                    </div><!-- chart-fourteen -->
                    <ul class="list-group list-group-flush mg-t-15">
                      <li class="list-group-item d-flex align-items-center">
                        <div class="crypto-icon crypto-icon-sm bg-orange">
                            <i class="cf cf-dash"></i>
                        </div>
                        <div class="mg-l-15">
                          <h6 class="lh-5 mg-b-0">Time Swappers</h6>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-medium">btc/usd</span>
                        </div>
                        <div class="mg-l-auto text-right">
                          <p class="mg-b-0 tx-rubik">0.7200 BTC</p>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-rubik">$2,907.71 USD</span>
                        </div>
                      </li>
                      <li class="list-group-item d-flex align-items-center">
                        <div class="crypto-icon crypto-icon-sm bg-secondary">
                            <i class="cf cf-dash"></i>
                        </div>
                        <div class="mg-l-15">
                          <h6 class="lh-5 mg-b-0">Buzcafe</h6>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-medium">eth/usd</span>
                        </div>
                        <div class="mg-l-auto text-right">
                          <p class="mg-b-0 tx-rubik">15.0030 ETH</p>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-rubik">$2,083.62 USD</span>
                        </div>
                      </li>
                      <li class="list-group-item d-flex align-items-center">
                        <div class="crypto-icon crypto-icon-sm bg-litecoin">
                            <i class="cf cf-dash"></i>
                        </div>
                        <div class="mg-l-15">
                          <h6 class="lh-5 mg-b-0">Day Swappers</h6>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-medium">ltc/usd</span>
                        </div>
                        <div class="mg-l-auto text-right">
                          <p class="mg-b-0 tx-rubik">12.5021 LTC</p>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-rubik">$748.88 USD</span>
                        </div>
                      </li>
                      <li class="list-group-item d-flex align-items-center">
                        <div class="crypto-icon crypto-icon-sm bg-success">
                            <i class="cf cf-dash"></i>
                        </div>
                        <div class="mg-l-15">
                          <h6 class="lh-5 mg-b-0">BetDeEx</h6>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-medium">bch/usd</span>
                        </div>
                        <div class="mg-l-auto text-right">
                          <p class="mg-b-0 tx-rubik">5.8120 BCH</p>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-rubik">$916.67 USD</span>
                        </div>
                      </li>
                      <li class="list-group-item d-flex align-items-center">
                        <div class="crypto-icon crypto-icon-sm bg-primary">
                          <i class="cf cf-dash"></i>
                        </div>
                        <div class="mg-l-15">
                          <h6 class="lh-5 mg-b-0">ComputeEx</h6>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-medium">dash/usd</span>
                        </div>
                        <div class="mg-l-auto text-right">
                          <p class="mg-b-0 tx-rubik">16.5019 DASH</p>
                          <span class="d-block tx-color-03 tx-uppercase tx-11 tx-rubik">$1,521.97 USD</span>
                        </div>
                      </li>
                      <li class="list-group-item d-flex align-items-center">
                          <div class="crypto-icon crypto-icon-sm bg-primary">
                            <i class="cf cf-dash"></i>
                          </div>
                          <div class="mg-l-15">
                            <h6 class="lh-5 mg-b-0">TimeAlly</h6>
                            <span class="d-block tx-color-03 tx-uppercase tx-11 tx-medium">dash/usd</span>
                          </div>
                          <div class="mg-l-auto text-right">
                            <p class="mg-b-0 tx-rubik">16.5019 DASH</p>
                            <span class="d-block tx-color-03 tx-uppercase tx-11 tx-rubik">$1,521.97 USD</span>
                          </div>
                        </li>
                    </ul>
                  </div><!-- card-body -->
                </div><!-- card -->
          </div>
          <div class="col-md-6 col-xl-4 mg-t-10">
              <div class="card">
                  <div class="card-header d-flex justify-content-between">
                    <h6 class="lh-5 mg-b-0">TimeAlly Stakers</h6>
                    <!-- <a href="" class="tx-11 link-03"><i data-feather="more-horizontal" class="wd-20 ht-20"></i></a> -->
                  </div><!-- card-header -->
                  <div class="card-body pd-x-20 pd-b-10">
                    <p class="tx-uppercase tx-11 tx-spacing-1 tx-color-03 tx-medium mg-b-5">Available Balance</p>
                    <h3 class="tx-26 tx-normal tx-rubik tx-spacing--2 mg-b-5">26.00453100 <small class="text-muted tx-light">ES</small></h3>
                    <div class="d-flex mg-b-25">
                      <p class="tx-12 tx-rubik mg-b-0"><span class="tx-medium tx-success mg-r-5">USDT</span> $103,342.50</p>
                      <p class="tx-12 tx-rubik mg-b-0 mg-l-10"><span class="tx-medium tx-primary mg-r-5">INR</span> 91,105.00</p>
                    </div>
                    <div class="d-flex mg-b-25">
                      <button class="btn btn-sm btn-uppercase btn-white flex-fill tx-spacing-1">1 Year Stakers</button>
                      <button class="btn btn-sm btn-uppercase btn-primary flex-fill tx-spacing-1 mg-l-10">2 Year Stakers</button>
                    </div>
    
                    <div class="d-flex align-items-center justify-content-between mg-b-10">
                      <p class="tx-uppercase tx-11 tx-spacing-1 tx-color-03 tx-medium mg-b-0">Recent Transactions</p>
                      <a href="" class="tx-uppercase tx-11 tx-medium mg-b-0">Show All</a>
                    </div>
                    <div class="chart-two mg-b-20">
                        <div id="flotChart25" class="flot-chart"></div>
                      </div>
                  </div><!-- card-body -->
                </div><!-- card -->
                <div class="d-flex mg-t-25">
                    <button class="btn btn-sm btn-uppercase btn-white flex-fill tx-spacing-1">Become A Curator</button>
                    <button class="btn btn-sm btn-uppercase btn-primary flex-fill tx-spacing-1 mg-l-10">Become A Time Trader</button>
                </div>
        </div><!-- row -->
        <div class="col-md-6 col-xl-4 mg-t-10"> 
              <div class="card ht-100p">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <h6 class="mg-b-0">Transaction History</h6>
                    <div class="d-flex mg-t-20 mg-sm-t-0">
                      <div class="btn-group flex-fill">
                        <button class="btn btn-white btn-xs active" style="color:#661111; font-size: 13px">All Coin</button>
                        <button class="btn btn-white btn-xs" style="color:#661111; font-size: 13px">Favourite</button>
                      </div>
                    </div>
                  </div>              
                  <ul class="list-group list-group-flush tx-13">
                    <li class="list-group-item d-flex pd-sm-x-20">
                      <div class="avatar d-none d-sm-block"><span class="avatar-initial rounded-circle bg-teal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span></div>
                      <div class="pd-sm-l-10">
                        <p class="tx-medium mg-b-0">Cryptocurrency :</p>
                        <small class="tx-medium mg-b-0">Price :</small><br>
                        <small class="tx-medium mg-b-0">Market Cap :</small>
                      </div>
                      <div class="mg-l-auto text-right">
                        <p class="tx-medium mg-b-0">BTC</p>
                        <small class="tx-12 tx-success mg-b-0">205</small><br>
                        <small class="tx-12 tx-success mg-b-0">5524</small>
                      </div>
                    </li>
                    <li class="list-group-item d-flex pd-sm-x-20">
                      <div class="avatar d-none d-sm-block"><span class="avatar-initial rounded-circle bg-teal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span></div>
                      <div class="pd-sm-l-10">
                        <p class="tx-medium mg-b-0">Cryptocurrency :</p>
                        <small class="tx-medium mg-b-0">Price :</small><br>
                        <small class="tx-medium mg-b-0">Market Cap :</small>
                      </div>
                      <div class="mg-l-auto text-right">
                        <p class="tx-medium mg-b-0">BTC</p>
                        <small class="tx-12 tx-success mg-b-0">205</small><br>
                        <small class="tx-12 tx-success mg-b-0">5524</small>
                      </div>
                    </li>
                    <li class="list-group-item d-flex pd-sm-x-20">
                      <div class="avatar d-none d-sm-block"><span class="avatar-initial rounded-circle bg-teal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span></div>
                      <div class="pd-sm-l-10">
                        <p class="tx-medium mg-b-0">Cryptocurrency :</p>
                        <small class="tx-medium mg-b-0">Price :</small><br>
                        <small class="tx-medium mg-b-0">Market Cap :</small>
                      </div>
                      <div class="mg-l-auto text-right">
                        <p class="tx-medium mg-b-0">BTC</p>
                        <small class="tx-12 tx-success mg-b-0">205</small><br>
                        <small class="tx-12 tx-success mg-b-0">5524</small>
                      </div>
                    </li>
                    <li class="list-group-item d-flex pd-sm-x-20">
                      <div class="avatar d-none d-sm-block"><span class="avatar-initial rounded-circle bg-teal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span></div>
                      <div class="pd-sm-l-10">
                        <p class="tx-medium mg-b-0">Cryptocurrency :</p>
                        <small class="tx-medium mg-b-0">Price :</small><br>
                        <small class="tx-medium mg-b-0">Market Cap :</small>
                      </div>
                      <div class="mg-l-auto text-right">
                        <p class="tx-medium mg-b-0">BTC</p>
                        <small class="tx-12 tx-success mg-b-0">205</small><br>
                        <small class="tx-12 tx-success mg-b-0">5524</small>
                      </div>
                    </li>
                    <li class="list-group-item d-flex pd-sm-x-20">
                      <div class="avatar d-none d-sm-block"><span class="avatar-initial rounded-circle bg-teal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></span></div>
                      <div class="pd-sm-l-10">
                        <p class="tx-medium mg-b-0">Cryptocurrency :</p>
                        <small class="tx-medium mg-b-0">Price :</small><br>
                        <small class="tx-medium mg-b-0">Market Cap :</small>
                      </div>
                      <div class="mg-l-auto text-right">
                        <p class="tx-medium mg-b-0">BTC</p>
                        <small class="tx-12 tx-success mg-b-0">205</small><br>
                        <small class="tx-12 tx-success mg-b-0">5524</small>
                      </div>
                    </li>
                  </ul>
                  <div class="card-footer text-center tx-13">
                    <a href="" class="link-03">View All Transactions <i class="icon ion-md-arrow-down mg-l-5"></i></a>
                  </div><!-- card-footer -->
                </div><!-- card -->                
          </div>
          <div class="row mg-t-10">
              <div class="col-lg-8 col-xl-9">
                  <div class="card">
                    <div class="card-header bd-b-0 pd-t-20 pd-lg-t-25 pd-l-20 pd-lg-l-25 d-flex flex-column flex-sm-row align-items-sm-start justify-content-sm-between">
                      <div>
                        <h6 class="mg-b-5">Era Swap Wallet</h6>
                      </div>
                      <div class="btn-group mg-t-20 mg-sm-t-0">
                        <button class="btn btn-xs btn-white btn-uppercase">Day</button>
                        <button class="btn btn-xs btn-white btn-uppercase">Week</button>
                        <button class="btn btn-xs btn-white btn-uppercase active">Month</button>
                      </div><!-- btn-group -->
                    </div><!-- card-header -->
                    <div class="card-body pd-lg-25">
                      <div class="row align-items-sm-end">
                        <div class="col-lg-7 col-xl-8">
                          <div class="chart-six"><canvas id="chartBar1"></canvas></div>
                        </div>
                        <div class="col-lg-5 col-xl-4 mg-t-30 mg-lg-t-0">
                          <div class="row">
                            <div class="col-sm-6 col-lg-12">
                              <div class="d-flex align-items-center justify-content-between mg-b-5">
                                <h6 class="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">ES Deposit</h6>
                                <span class="tx-10 tx-color-04">65% goal reached</span>
                              </div>
                              <div class="d-flex align-items-end justify-content-between mg-b-5">
                                <h5 class="tx-normal tx-rubik lh-2 mg-b-0">13,596</h5>
                                <h6 class="tx-normal tx-rubik tx-color-03 lh-2 mg-b-0">20,000</h6>
                              </div>
                              <div class="progress ht-4 mg-b-0 op-5">
                                <div class="progress-bar bg-teal wd-65p" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                            <div class="col-sm-6 col-lg-12 mg-t-30 mg-sm-t-0 mg-lg-t-30">
                              <div class="d-flex align-items-center justify-content-between mg-b-5">
                                <h6 class="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">ES Withdraw</h6>
                                <span class="tx-10 tx-color-04">45% goal reached</span>
                              </div>
                              <div class="d-flex justify-content-between mg-b-5">
                                <h5 class="tx-normal tx-rubik mg-b-0">83,123</h5>
                                <h5 class="tx-normal tx-rubik tx-color-03 mg-b-0"><small>250,000</small></h5>
                              </div>
                              <div class="progress ht-4 mg-b-0 op-5">
                                <div class="progress-bar bg-orange wd-45p" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                            <div class="col-sm-6 col-lg-12 mg-t-30">
                              <div class="d-flex align-items-center justify-content-between mg-b-5">
                                <h6 class="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">Transactions Charges</h6>
                                <span class="tx-10 tx-color-04">20% goal reached</span>
                              </div>
                              <div class="d-flex justify-content-between mg-b-5">
                                <h5 class="tx-normal tx-rubik mg-b-0">16,869</h5>
                                <h5 class="tx-normal tx-rubik tx-color-03 mg-b-0"><small>85,000</small></h5>
                              </div>
                              <div class="progress ht-4 mg-b-0 op-5">
                                <div class="progress-bar bg-pink wd-20p" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                            <div class="col-sm-6 col-lg-12 mg-t-30">
                              <div class="d-flex align-items-center justify-content-between mg-b-5">
                                <h6 class="tx-uppercase tx-10 tx-spacing-1 tx-color-02 tx-semibold mg-b-0">Total ES Purchased</h6>
                                <span class="tx-10 tx-color-04">85% goal reached</span>
                              </div>
                              <div class="d-flex justify-content-between mg-b-5">
                                <h5 class="tx-normal tx-rubik mg-b-0">28.50%</h5>
                                <h5 class="tx-normal tx-rubik tx-color-03 mg-b-0"><small>30.50%</small></h5>
                              </div>
                              <div class="progress ht-4 mg-b-0 op-5">
                                <div class="progress-bar bg-primary wd-85p" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div><!-- row -->
      
                        </div>
                      </div>
                    </div><!-- card-body -->
                  </div><!-- card -->
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3 mg-t-10 mg-lg-t-0">
                  <div class="card">
                    <div class="card-header">
                      <h6 class="mg-b-0">Charity Pool</h6>
                    </div><!-- card-header -->
                    <div class="card-body pd-lg-25">
                      <div class="chart-seven"><canvas id="chartDonut3"></canvas></div>
                    </div><!-- card-body -->
                    <div class="card-footer pd-20">
                      <div class="row">
                        <div class="col-12">
                          <p class="tx-10 tx-uppercase tx-medium tx-color-03 tx-spacing-1 tx-nowrap mg-b-5">Charity Collected</p>
                          <div class="d-flex align-items-center">
                            <div class="wd-10 ht-10 rounded-circle bg-pink mg-r-5"></div>
                            <h5 class="tx-normal tx-rubik mg-b-0">1,320 <small class="tx-color-04">25%</small></h5>
                          </div>
                        </div><!-- col -->                       
                        <div class="col-12 mg-t-20">
                          <p class="tx-10 tx-uppercase tx-medium tx-color-03 tx-spacing-1 mg-b-5">Charity Given</p>
                          <div class="d-flex align-items-center">
                            <div class="wd-10 ht-10 rounded-circle bg-teal mg-r-5"></div>
                            <h5 class="tx-normal tx-rubik mg-b-0">2,010 <small class="tx-color-04">30%</small></h5>
                          </div>
                        </div><!-- col -->                       
                      </div><!-- row -->
                    </div><!-- card-footer -->
                  </div><!-- card -->
                </div>
          </div>
      </div><!-- container -->
      </div>
    </div>
  
     <Footer />
