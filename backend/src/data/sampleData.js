/**
 * Sample Dataset — State-wise Artisan Beneficiary Data (2015–2022)
 * Source: Inspired by data.gov.in / PM Vishwakarma scheme records
 * Note: Numbers are for demonstration purposes.
 */

const sampleData = [
  // ──────────────────────── UTTAR PRADESH ────────────────────────
  { state: "Uttar Pradesh", year: 2015, beneficiaries: 68500, male_beneficiaries: 38000, female_beneficiaries: 30500, budget_allocated: 4795, scheme: "PM Vishwakarma" },
  { state: "Uttar Pradesh", year: 2016, beneficiaries: 73200, male_beneficiaries: 40800, female_beneficiaries: 32400, budget_allocated: 5124, scheme: "PM Vishwakarma" },
  { state: "Uttar Pradesh", year: 2017, beneficiaries: 78600, male_beneficiaries: 43700, female_beneficiaries: 34900, budget_allocated: 5502, scheme: "PM Vishwakarma" },
  { state: "Uttar Pradesh", year: 2018, beneficiaries: 82300, male_beneficiaries: 45800, female_beneficiaries: 36500, budget_allocated: 5761, scheme: "PM Vishwakarma" },
  { state: "Uttar Pradesh", year: 2019, beneficiaries: 87100, male_beneficiaries: 48500, female_beneficiaries: 38600, budget_allocated: 6097, scheme: "PM Vishwakarma" },
  { state: "Uttar Pradesh", year: 2020, beneficiaries: 71400, male_beneficiaries: 39800, female_beneficiaries: 31600, budget_allocated: 4998, scheme: "PM Vishwakarma" },
  { state: "Uttar Pradesh", year: 2021, beneficiaries: 91200, male_beneficiaries: 50700, female_beneficiaries: 40500, budget_allocated: 6384, scheme: "PM Vishwakarma" },
  { state: "Uttar Pradesh", year: 2022, beneficiaries: 98500, male_beneficiaries: 54800, female_beneficiaries: 43700, budget_allocated: 6895, scheme: "PM Vishwakarma" },

  // ──────────────────────── RAJASTHAN ────────────────────────
  { state: "Rajasthan", year: 2015, beneficiaries: 52300, male_beneficiaries: 28000, female_beneficiaries: 24300, budget_allocated: 3661, scheme: "PM Vishwakarma" },
  { state: "Rajasthan", year: 2016, beneficiaries: 55800, male_beneficiaries: 29900, female_beneficiaries: 25900, budget_allocated: 3906, scheme: "PM Vishwakarma" },
  { state: "Rajasthan", year: 2017, beneficiaries: 59400, male_beneficiaries: 31800, female_beneficiaries: 27600, budget_allocated: 4158, scheme: "PM Vishwakarma" },
  { state: "Rajasthan", year: 2018, beneficiaries: 63700, male_beneficiaries: 34100, female_beneficiaries: 29600, budget_allocated: 4459, scheme: "PM Vishwakarma" },
  { state: "Rajasthan", year: 2019, beneficiaries: 67200, male_beneficiaries: 36000, female_beneficiaries: 31200, budget_allocated: 4704, scheme: "PM Vishwakarma" },
  { state: "Rajasthan", year: 2020, beneficiaries: 54100, male_beneficiaries: 29000, female_beneficiaries: 25100, budget_allocated: 3787, scheme: "PM Vishwakarma" },
  { state: "Rajasthan", year: 2021, beneficiaries: 71800, male_beneficiaries: 38500, female_beneficiaries: 33300, budget_allocated: 5026, scheme: "PM Vishwakarma" },
  { state: "Rajasthan", year: 2022, beneficiaries: 78400, male_beneficiaries: 42000, female_beneficiaries: 36400, budget_allocated: 5488, scheme: "PM Vishwakarma" },

  // ──────────────────────── MADHYA PRADESH ────────────────────────
  { state: "Madhya Pradesh", year: 2015, beneficiaries: 47800, male_beneficiaries: 26000, female_beneficiaries: 21800, budget_allocated: 3346, scheme: "PM Vishwakarma" },
  { state: "Madhya Pradesh", year: 2016, beneficiaries: 50600, male_beneficiaries: 27500, female_beneficiaries: 23100, budget_allocated: 3542, scheme: "PM Vishwakarma" },
  { state: "Madhya Pradesh", year: 2017, beneficiaries: 54200, male_beneficiaries: 29500, female_beneficiaries: 24700, budget_allocated: 3794, scheme: "PM Vishwakarma" },
  { state: "Madhya Pradesh", year: 2018, beneficiaries: 57900, male_beneficiaries: 31500, female_beneficiaries: 26400, budget_allocated: 4053, scheme: "PM Vishwakarma" },
  { state: "Madhya Pradesh", year: 2019, beneficiaries: 61400, male_beneficiaries: 33400, female_beneficiaries: 28000, budget_allocated: 4298, scheme: "PM Vishwakarma" },
  { state: "Madhya Pradesh", year: 2020, beneficiaries: 49200, male_beneficiaries: 26700, female_beneficiaries: 22500, budget_allocated: 3444, scheme: "PM Vishwakarma" },
  { state: "Madhya Pradesh", year: 2021, beneficiaries: 65700, male_beneficiaries: 35700, female_beneficiaries: 30000, budget_allocated: 4599, scheme: "PM Vishwakarma" },
  { state: "Madhya Pradesh", year: 2022, beneficiaries: 72100, male_beneficiaries: 39200, female_beneficiaries: 32900, budget_allocated: 5047, scheme: "PM Vishwakarma" },

  // ──────────────────────── WEST BENGAL ────────────────────────
  { state: "West Bengal", year: 2015, beneficiaries: 43600, male_beneficiaries: 22500, female_beneficiaries: 21100, budget_allocated: 3052, scheme: "PM Vishwakarma" },
  { state: "West Bengal", year: 2016, beneficiaries: 46800, male_beneficiaries: 24100, female_beneficiaries: 22700, budget_allocated: 3276, scheme: "PM Vishwakarma" },
  { state: "West Bengal", year: 2017, beneficiaries: 49700, male_beneficiaries: 25600, female_beneficiaries: 24100, budget_allocated: 3479, scheme: "PM Vishwakarma" },
  { state: "West Bengal", year: 2018, beneficiaries: 52300, male_beneficiaries: 26900, female_beneficiaries: 25400, budget_allocated: 3661, scheme: "PM Vishwakarma" },
  { state: "West Bengal", year: 2019, beneficiaries: 55800, male_beneficiaries: 28700, female_beneficiaries: 27100, budget_allocated: 3906, scheme: "PM Vishwakarma" },
  { state: "West Bengal", year: 2020, beneficiaries: 44200, male_beneficiaries: 22800, female_beneficiaries: 21400, budget_allocated: 3094, scheme: "PM Vishwakarma" },
  { state: "West Bengal", year: 2021, beneficiaries: 59400, male_beneficiaries: 30600, female_beneficiaries: 28800, budget_allocated: 4158, scheme: "PM Vishwakarma" },
  { state: "West Bengal", year: 2022, beneficiaries: 65100, male_beneficiaries: 33500, female_beneficiaries: 31600, budget_allocated: 4557, scheme: "PM Vishwakarma" },

  // ──────────────────────── MAHARASHTRA ────────────────────────
  { state: "Maharashtra", year: 2015, beneficiaries: 39200, male_beneficiaries: 20800, female_beneficiaries: 18400, budget_allocated: 2744, scheme: "PM Vishwakarma" },
  { state: "Maharashtra", year: 2016, beneficiaries: 42100, male_beneficiaries: 22300, female_beneficiaries: 19800, budget_allocated: 2947, scheme: "PM Vishwakarma" },
  { state: "Maharashtra", year: 2017, beneficiaries: 45300, male_beneficiaries: 24000, female_beneficiaries: 21300, budget_allocated: 3171, scheme: "PM Vishwakarma" },
  { state: "Maharashtra", year: 2018, beneficiaries: 48700, male_beneficiaries: 25800, female_beneficiaries: 22900, budget_allocated: 3409, scheme: "PM Vishwakarma" },
  { state: "Maharashtra", year: 2019, beneficiaries: 52400, male_beneficiaries: 27800, female_beneficiaries: 24600, budget_allocated: 3668, scheme: "PM Vishwakarma" },
  { state: "Maharashtra", year: 2020, beneficiaries: 41800, male_beneficiaries: 22200, female_beneficiaries: 19600, budget_allocated: 2926, scheme: "PM Vishwakarma" },
  { state: "Maharashtra", year: 2021, beneficiaries: 56200, male_beneficiaries: 29800, female_beneficiaries: 26400, budget_allocated: 3934, scheme: "PM Vishwakarma" },
  { state: "Maharashtra", year: 2022, beneficiaries: 61800, male_beneficiaries: 32700, female_beneficiaries: 29100, budget_allocated: 4326, scheme: "PM Vishwakarma" },

  // ──────────────────────── TAMIL NADU ────────────────────────
  { state: "Tamil Nadu", year: 2015, beneficiaries: 36400, male_beneficiaries: 18200, female_beneficiaries: 18200, budget_allocated: 2548, scheme: "PM Vishwakarma" },
  { state: "Tamil Nadu", year: 2016, beneficiaries: 39100, male_beneficiaries: 19600, female_beneficiaries: 19500, budget_allocated: 2737, scheme: "PM Vishwakarma" },
  { state: "Tamil Nadu", year: 2017, beneficiaries: 41900, male_beneficiaries: 21000, female_beneficiaries: 20900, budget_allocated: 2933, scheme: "PM Vishwakarma" },
  { state: "Tamil Nadu", year: 2018, beneficiaries: 44800, male_beneficiaries: 22500, female_beneficiaries: 22300, budget_allocated: 3136, scheme: "PM Vishwakarma" },
  { state: "Tamil Nadu", year: 2019, beneficiaries: 47600, male_beneficiaries: 23900, female_beneficiaries: 23700, budget_allocated: 3332, scheme: "PM Vishwakarma" },
  { state: "Tamil Nadu", year: 2020, beneficiaries: 38200, male_beneficiaries: 19200, female_beneficiaries: 19000, budget_allocated: 2674, scheme: "PM Vishwakarma" },
  { state: "Tamil Nadu", year: 2021, beneficiaries: 51300, male_beneficiaries: 25800, female_beneficiaries: 25500, budget_allocated: 3591, scheme: "PM Vishwakarma" },
  { state: "Tamil Nadu", year: 2022, beneficiaries: 57200, male_beneficiaries: 28800, female_beneficiaries: 28400, budget_allocated: 4004, scheme: "PM Vishwakarma" },

  // ──────────────────────── GUJARAT ────────────────────────
  { state: "Gujarat", year: 2015, beneficiaries: 31800, male_beneficiaries: 17200, female_beneficiaries: 14600, budget_allocated: 2226, scheme: "PM Vishwakarma" },
  { state: "Gujarat", year: 2016, beneficiaries: 34200, male_beneficiaries: 18500, female_beneficiaries: 15700, budget_allocated: 2394, scheme: "PM Vishwakarma" },
  { state: "Gujarat", year: 2017, beneficiaries: 36900, male_beneficiaries: 20000, female_beneficiaries: 16900, budget_allocated: 2583, scheme: "PM Vishwakarma" },
  { state: "Gujarat", year: 2018, beneficiaries: 39400, male_beneficiaries: 21300, female_beneficiaries: 18100, budget_allocated: 2758, scheme: "PM Vishwakarma" },
  { state: "Gujarat", year: 2019, beneficiaries: 42600, male_beneficiaries: 23100, female_beneficiaries: 19500, budget_allocated: 2982, scheme: "PM Vishwakarma" },
  { state: "Gujarat", year: 2020, beneficiaries: 35800, male_beneficiaries: 19400, female_beneficiaries: 16400, budget_allocated: 2506, scheme: "PM Vishwakarma" },
  { state: "Gujarat", year: 2021, beneficiaries: 46100, male_beneficiaries: 25000, female_beneficiaries: 21100, budget_allocated: 3227, scheme: "PM Vishwakarma" },
  { state: "Gujarat", year: 2022, beneficiaries: 51200, male_beneficiaries: 27800, female_beneficiaries: 23400, budget_allocated: 3584, scheme: "PM Vishwakarma" },

  // ──────────────────────── ANDHRA PRADESH ────────────────────────
  { state: "Andhra Pradesh", year: 2015, beneficiaries: 28600, male_beneficiaries: 14800, female_beneficiaries: 13800, budget_allocated: 2002, scheme: "PM Vishwakarma" },
  { state: "Andhra Pradesh", year: 2016, beneficiaries: 30900, male_beneficiaries: 16000, female_beneficiaries: 14900, budget_allocated: 2163, scheme: "PM Vishwakarma" },
  { state: "Andhra Pradesh", year: 2017, beneficiaries: 33400, male_beneficiaries: 17300, female_beneficiaries: 16100, budget_allocated: 2338, scheme: "PM Vishwakarma" },
  { state: "Andhra Pradesh", year: 2018, beneficiaries: 36100, male_beneficiaries: 18700, female_beneficiaries: 17400, budget_allocated: 2527, scheme: "PM Vishwakarma" },
  { state: "Andhra Pradesh", year: 2019, beneficiaries: 38900, male_beneficiaries: 20200, female_beneficiaries: 18700, budget_allocated: 2723, scheme: "PM Vishwakarma" },
  { state: "Andhra Pradesh", year: 2020, beneficiaries: 31200, male_beneficiaries: 16200, female_beneficiaries: 15000, budget_allocated: 2184, scheme: "PM Vishwakarma" },
  { state: "Andhra Pradesh", year: 2021, beneficiaries: 42400, male_beneficiaries: 22000, female_beneficiaries: 20400, budget_allocated: 2968, scheme: "PM Vishwakarma" },
  { state: "Andhra Pradesh", year: 2022, beneficiaries: 47800, male_beneficiaries: 24800, female_beneficiaries: 23000, budget_allocated: 3346, scheme: "PM Vishwakarma" },

  // ──────────────────────── KARNATAKA ────────────────────────
  { state: "Karnataka", year: 2015, beneficiaries: 25400, male_beneficiaries: 13200, female_beneficiaries: 12200, budget_allocated: 1778, scheme: "PM Vishwakarma" },
  { state: "Karnataka", year: 2016, beneficiaries: 27600, male_beneficiaries: 14300, female_beneficiaries: 13300, budget_allocated: 1932, scheme: "PM Vishwakarma" },
  { state: "Karnataka", year: 2017, beneficiaries: 29800, male_beneficiaries: 15500, female_beneficiaries: 14300, budget_allocated: 2086, scheme: "PM Vishwakarma" },
  { state: "Karnataka", year: 2018, beneficiaries: 32200, male_beneficiaries: 16700, female_beneficiaries: 15500, budget_allocated: 2254, scheme: "PM Vishwakarma" },
  { state: "Karnataka", year: 2019, beneficiaries: 34900, male_beneficiaries: 18100, female_beneficiaries: 16800, budget_allocated: 2443, scheme: "PM Vishwakarma" },
  { state: "Karnataka", year: 2020, beneficiaries: 27300, male_beneficiaries: 14200, female_beneficiaries: 13100, budget_allocated: 1911, scheme: "PM Vishwakarma" },
  { state: "Karnataka", year: 2021, beneficiaries: 37800, male_beneficiaries: 19600, female_beneficiaries: 18200, budget_allocated: 2646, scheme: "PM Vishwakarma" },
  { state: "Karnataka", year: 2022, beneficiaries: 42600, male_beneficiaries: 22100, female_beneficiaries: 20500, budget_allocated: 2982, scheme: "PM Vishwakarma" },

  // ──────────────────────── ODISHA ────────────────────────
  { state: "Odisha", year: 2015, beneficiaries: 22100, male_beneficiaries: 11200, female_beneficiaries: 10900, budget_allocated: 1547, scheme: "PM Vishwakarma" },
  { state: "Odisha", year: 2016, beneficiaries: 24300, male_beneficiaries: 12300, female_beneficiaries: 12000, budget_allocated: 1701, scheme: "PM Vishwakarma" },
  { state: "Odisha", year: 2017, beneficiaries: 26800, male_beneficiaries: 13600, female_beneficiaries: 13200, budget_allocated: 1876, scheme: "PM Vishwakarma" },
  { state: "Odisha", year: 2018, beneficiaries: 29300, male_beneficiaries: 14900, female_beneficiaries: 14400, budget_allocated: 2051, scheme: "PM Vishwakarma" },
  { state: "Odisha", year: 2019, beneficiaries: 32100, male_beneficiaries: 16300, female_beneficiaries: 15800, budget_allocated: 2247, scheme: "PM Vishwakarma" },
  { state: "Odisha", year: 2020, beneficiaries: 25900, male_beneficiaries: 13200, female_beneficiaries: 12700, budget_allocated: 1813, scheme: "PM Vishwakarma" },
  { state: "Odisha", year: 2021, beneficiaries: 35700, male_beneficiaries: 18200, female_beneficiaries: 17500, budget_allocated: 2499, scheme: "PM Vishwakarma" },
  { state: "Odisha", year: 2022, beneficiaries: 40200, male_beneficiaries: 20500, female_beneficiaries: 19700, budget_allocated: 2814, scheme: "PM Vishwakarma" },

  // ──────────────────────── TELANGANA ────────────────────────
  { state: "Telangana", year: 2015, beneficiaries: 14200, male_beneficiaries: 7400, female_beneficiaries: 6800, budget_allocated: 994, scheme: "PM Vishwakarma" },
  { state: "Telangana", year: 2016, beneficiaries: 17600, male_beneficiaries: 9200, female_beneficiaries: 8400, budget_allocated: 1232, scheme: "PM Vishwakarma" },
  { state: "Telangana", year: 2017, beneficiaries: 21800, male_beneficiaries: 11400, female_beneficiaries: 10400, budget_allocated: 1526, scheme: "PM Vishwakarma" },
  { state: "Telangana", year: 2018, beneficiaries: 26400, male_beneficiaries: 13800, female_beneficiaries: 12600, budget_allocated: 1848, scheme: "PM Vishwakarma" },
  { state: "Telangana", year: 2019, beneficiaries: 31200, male_beneficiaries: 16300, female_beneficiaries: 14900, budget_allocated: 2184, scheme: "PM Vishwakarma" },
  { state: "Telangana", year: 2020, beneficiaries: 27100, male_beneficiaries: 14200, female_beneficiaries: 12900, budget_allocated: 1897, scheme: "PM Vishwakarma" },
  { state: "Telangana", year: 2021, beneficiaries: 36800, male_beneficiaries: 19300, female_beneficiaries: 17500, budget_allocated: 2576, scheme: "PM Vishwakarma" },
  { state: "Telangana", year: 2022, beneficiaries: 43500, male_beneficiaries: 22800, female_beneficiaries: 20700, budget_allocated: 3045, scheme: "PM Vishwakarma" },

  // ──────────────────────── KERALA ────────────────────────
  { state: "Kerala", year: 2015, beneficiaries: 19300, male_beneficiaries: 9300, female_beneficiaries: 10000, budget_allocated: 1351, scheme: "PM Vishwakarma" },
  { state: "Kerala", year: 2016, beneficiaries: 20800, male_beneficiaries: 10000, female_beneficiaries: 10800, budget_allocated: 1456, scheme: "PM Vishwakarma" },
  { state: "Kerala", year: 2017, beneficiaries: 22400, male_beneficiaries: 10800, female_beneficiaries: 11600, budget_allocated: 1568, scheme: "PM Vishwakarma" },
  { state: "Kerala", year: 2018, beneficiaries: 23900, male_beneficiaries: 11500, female_beneficiaries: 12400, budget_allocated: 1673, scheme: "PM Vishwakarma" },
  { state: "Kerala", year: 2019, beneficiaries: 25700, male_beneficiaries: 12400, female_beneficiaries: 13300, budget_allocated: 1799, scheme: "PM Vishwakarma" },
  { state: "Kerala", year: 2020, beneficiaries: 21200, male_beneficiaries: 10200, female_beneficiaries: 11000, budget_allocated: 1484, scheme: "PM Vishwakarma" },
  { state: "Kerala", year: 2021, beneficiaries: 27900, male_beneficiaries: 13500, female_beneficiaries: 14400, budget_allocated: 1953, scheme: "PM Vishwakarma" },
  { state: "Kerala", year: 2022, beneficiaries: 31400, male_beneficiaries: 15200, female_beneficiaries: 16200, budget_allocated: 2198, scheme: "PM Vishwakarma" },

  // ──────────────────────── BIHAR ────────────────────────
  { state: "Bihar", year: 2015, beneficiaries: 18900, male_beneficiaries: 10800, female_beneficiaries: 8100, budget_allocated: 1323, scheme: "PM Vishwakarma" },
  { state: "Bihar", year: 2016, beneficiaries: 19400, male_beneficiaries: 11100, female_beneficiaries: 8300, budget_allocated: 1358, scheme: "PM Vishwakarma" },
  { state: "Bihar", year: 2017, beneficiaries: 20100, male_beneficiaries: 11500, female_beneficiaries: 8600, budget_allocated: 1407, scheme: "PM Vishwakarma" },
  { state: "Bihar", year: 2018, beneficiaries: 19600, male_beneficiaries: 11200, female_beneficiaries: 8400, budget_allocated: 1372, scheme: "PM Vishwakarma" },
  { state: "Bihar", year: 2019, beneficiaries: 21200, male_beneficiaries: 12100, female_beneficiaries: 9100, budget_allocated: 1484, scheme: "PM Vishwakarma" },
  { state: "Bihar", year: 2020, beneficiaries: 16800, male_beneficiaries: 9600, female_beneficiaries: 7200, budget_allocated: 1176, scheme: "PM Vishwakarma" },
  { state: "Bihar", year: 2021, beneficiaries: 22300, male_beneficiaries: 12700, female_beneficiaries: 9600, budget_allocated: 1561, scheme: "PM Vishwakarma" },
  { state: "Bihar", year: 2022, beneficiaries: 23800, male_beneficiaries: 13600, female_beneficiaries: 10200, budget_allocated: 1666, scheme: "PM Vishwakarma" },

  // ──────────────────────── HARYANA ────────────────────────
  { state: "Haryana", year: 2015, beneficiaries: 16400, male_beneficiaries: 9200, female_beneficiaries: 7200, budget_allocated: 1148, scheme: "PM Vishwakarma" },
  { state: "Haryana", year: 2016, beneficiaries: 17800, male_beneficiaries: 10000, female_beneficiaries: 7800, budget_allocated: 1246, scheme: "PM Vishwakarma" },
  { state: "Haryana", year: 2017, beneficiaries: 19200, male_beneficiaries: 10800, female_beneficiaries: 8400, budget_allocated: 1344, scheme: "PM Vishwakarma" },
  { state: "Haryana", year: 2018, beneficiaries: 20600, male_beneficiaries: 11600, female_beneficiaries: 9000, budget_allocated: 1442, scheme: "PM Vishwakarma" },
  { state: "Haryana", year: 2019, beneficiaries: 22100, male_beneficiaries: 12400, female_beneficiaries: 9700, budget_allocated: 1547, scheme: "PM Vishwakarma" },
  { state: "Haryana", year: 2020, beneficiaries: 18200, male_beneficiaries: 10200, female_beneficiaries: 8000, budget_allocated: 1274, scheme: "PM Vishwakarma" },
  { state: "Haryana", year: 2021, beneficiaries: 23800, male_beneficiaries: 13400, female_beneficiaries: 10400, budget_allocated: 1666, scheme: "PM Vishwakarma" },
  { state: "Haryana", year: 2022, beneficiaries: 26400, male_beneficiaries: 14900, female_beneficiaries: 11500, budget_allocated: 1848, scheme: "PM Vishwakarma" },

  // ──────────────────────── PUNJAB ────────────────────────
  { state: "Punjab", year: 2015, beneficiaries: 14800, male_beneficiaries: 8200, female_beneficiaries: 6600, budget_allocated: 1036, scheme: "PM Vishwakarma" },
  { state: "Punjab", year: 2016, beneficiaries: 15900, male_beneficiaries: 8800, female_beneficiaries: 7100, budget_allocated: 1113, scheme: "PM Vishwakarma" },
  { state: "Punjab", year: 2017, beneficiaries: 17200, male_beneficiaries: 9600, female_beneficiaries: 7600, budget_allocated: 1204, scheme: "PM Vishwakarma" },
  { state: "Punjab", year: 2018, beneficiaries: 18400, male_beneficiaries: 10300, female_beneficiaries: 8100, budget_allocated: 1288, scheme: "PM Vishwakarma" },
  { state: "Punjab", year: 2019, beneficiaries: 19800, male_beneficiaries: 11100, female_beneficiaries: 8700, budget_allocated: 1386, scheme: "PM Vishwakarma" },
  { state: "Punjab", year: 2020, beneficiaries: 15600, male_beneficiaries: 8700, female_beneficiaries: 6900, budget_allocated: 1092, scheme: "PM Vishwakarma" },
  { state: "Punjab", year: 2021, beneficiaries: 21300, male_beneficiaries: 11900, female_beneficiaries: 9400, budget_allocated: 1491, scheme: "PM Vishwakarma" },
  { state: "Punjab", year: 2022, beneficiaries: 23900, male_beneficiaries: 13400, female_beneficiaries: 10500, budget_allocated: 1673, scheme: "PM Vishwakarma" },

  // ──────────────────────── JHARKHAND ────────────────────────
  { state: "Jharkhand", year: 2015, beneficiaries: 13200, male_beneficiaries: 7200, female_beneficiaries: 6000, budget_allocated: 924, scheme: "PM Vishwakarma" },
  { state: "Jharkhand", year: 2016, beneficiaries: 13800, male_beneficiaries: 7500, female_beneficiaries: 6300, budget_allocated: 966, scheme: "PM Vishwakarma" },
  { state: "Jharkhand", year: 2017, beneficiaries: 14600, male_beneficiaries: 8000, female_beneficiaries: 6600, budget_allocated: 1022, scheme: "PM Vishwakarma" },
  { state: "Jharkhand", year: 2018, beneficiaries: 14100, male_beneficiaries: 7700, female_beneficiaries: 6400, budget_allocated: 987, scheme: "PM Vishwakarma" },
  { state: "Jharkhand", year: 2019, beneficiaries: 15400, male_beneficiaries: 8400, female_beneficiaries: 7000, budget_allocated: 1078, scheme: "PM Vishwakarma" },
  { state: "Jharkhand", year: 2020, beneficiaries: 11800, male_beneficiaries: 6400, female_beneficiaries: 5400, budget_allocated: 826, scheme: "PM Vishwakarma" },
  { state: "Jharkhand", year: 2021, beneficiaries: 16900, male_beneficiaries: 9200, female_beneficiaries: 7700, budget_allocated: 1183, scheme: "PM Vishwakarma" },
  { state: "Jharkhand", year: 2022, beneficiaries: 19200, male_beneficiaries: 10500, female_beneficiaries: 8700, budget_allocated: 1344, scheme: "PM Vishwakarma" },

  // ──────────────────────── CHHATTISGARH ────────────────────────
  { state: "Chhattisgarh", year: 2015, beneficiaries: 14900, male_beneficiaries: 7800, female_beneficiaries: 7100, budget_allocated: 1043, scheme: "PM Vishwakarma" },
  { state: "Chhattisgarh", year: 2016, beneficiaries: 15800, male_beneficiaries: 8200, female_beneficiaries: 7600, budget_allocated: 1106, scheme: "PM Vishwakarma" },
  { state: "Chhattisgarh", year: 2017, beneficiaries: 17200, male_beneficiaries: 9000, female_beneficiaries: 8200, budget_allocated: 1204, scheme: "PM Vishwakarma" },
  { state: "Chhattisgarh", year: 2018, beneficiaries: 18600, male_beneficiaries: 9700, female_beneficiaries: 8900, budget_allocated: 1302, scheme: "PM Vishwakarma" },
  { state: "Chhattisgarh", year: 2019, beneficiaries: 19900, male_beneficiaries: 10400, female_beneficiaries: 9500, budget_allocated: 1393, scheme: "PM Vishwakarma" },
  { state: "Chhattisgarh", year: 2020, beneficiaries: 16200, male_beneficiaries: 8500, female_beneficiaries: 7700, budget_allocated: 1134, scheme: "PM Vishwakarma" },
  { state: "Chhattisgarh", year: 2021, beneficiaries: 21600, male_beneficiaries: 11300, female_beneficiaries: 10300, budget_allocated: 1512, scheme: "PM Vishwakarma" },
  { state: "Chhattisgarh", year: 2022, beneficiaries: 24300, male_beneficiaries: 12700, female_beneficiaries: 11600, budget_allocated: 1701, scheme: "PM Vishwakarma" },

  // ──────────────────────── ASSAM ────────────────────────
  { state: "Assam", year: 2015, beneficiaries: 12600, male_beneficiaries: 6100, female_beneficiaries: 6500, budget_allocated: 882, scheme: "PM Vishwakarma" },
  { state: "Assam", year: 2016, beneficiaries: 13400, male_beneficiaries: 6500, female_beneficiaries: 6900, budget_allocated: 938, scheme: "PM Vishwakarma" },
  { state: "Assam", year: 2017, beneficiaries: 14300, male_beneficiaries: 6900, female_beneficiaries: 7400, budget_allocated: 1001, scheme: "PM Vishwakarma" },
  { state: "Assam", year: 2018, beneficiaries: 15200, male_beneficiaries: 7400, female_beneficiaries: 7800, budget_allocated: 1064, scheme: "PM Vishwakarma" },
  { state: "Assam", year: 2019, beneficiaries: 16100, male_beneficiaries: 7800, female_beneficiaries: 8300, budget_allocated: 1127, scheme: "PM Vishwakarma" },
  { state: "Assam", year: 2020, beneficiaries: 12900, male_beneficiaries: 6200, female_beneficiaries: 6700, budget_allocated: 903, scheme: "PM Vishwakarma" },
  { state: "Assam", year: 2021, beneficiaries: 17400, male_beneficiaries: 8400, female_beneficiaries: 9000, budget_allocated: 1218, scheme: "PM Vishwakarma" },
  { state: "Assam", year: 2022, beneficiaries: 19200, male_beneficiaries: 9300, female_beneficiaries: 9900, budget_allocated: 1344, scheme: "PM Vishwakarma" },

  // ──────────────────────── HIMACHAL PRADESH ────────────────────────
  { state: "Himachal Pradesh", year: 2015, beneficiaries: 8200, male_beneficiaries: 4400, female_beneficiaries: 3800, budget_allocated: 574, scheme: "PM Vishwakarma" },
  { state: "Himachal Pradesh", year: 2016, beneficiaries: 8900, male_beneficiaries: 4800, female_beneficiaries: 4100, budget_allocated: 623, scheme: "PM Vishwakarma" },
  { state: "Himachal Pradesh", year: 2017, beneficiaries: 9700, male_beneficiaries: 5200, female_beneficiaries: 4500, budget_allocated: 679, scheme: "PM Vishwakarma" },
  { state: "Himachal Pradesh", year: 2018, beneficiaries: 10400, male_beneficiaries: 5600, female_beneficiaries: 4800, budget_allocated: 728, scheme: "PM Vishwakarma" },
  { state: "Himachal Pradesh", year: 2019, beneficiaries: 11200, male_beneficiaries: 6000, female_beneficiaries: 5200, budget_allocated: 784, scheme: "PM Vishwakarma" },
  { state: "Himachal Pradesh", year: 2020, beneficiaries: 9100, male_beneficiaries: 4900, female_beneficiaries: 4200, budget_allocated: 637, scheme: "PM Vishwakarma" },
  { state: "Himachal Pradesh", year: 2021, beneficiaries: 12300, male_beneficiaries: 6600, female_beneficiaries: 5700, budget_allocated: 861, scheme: "PM Vishwakarma" },
  { state: "Himachal Pradesh", year: 2022, beneficiaries: 14100, male_beneficiaries: 7600, female_beneficiaries: 6500, budget_allocated: 987, scheme: "PM Vishwakarma" },

  // ──────────────────────── UTTARAKHAND ────────────────────────
  { state: "Uttarakhand", year: 2015, beneficiaries: 9400, male_beneficiaries: 5100, female_beneficiaries: 4300, budget_allocated: 658, scheme: "PM Vishwakarma" },
  { state: "Uttarakhand", year: 2016, beneficiaries: 10200, male_beneficiaries: 5500, female_beneficiaries: 4700, budget_allocated: 714, scheme: "PM Vishwakarma" },
  { state: "Uttarakhand", year: 2017, beneficiaries: 11100, male_beneficiaries: 6000, female_beneficiaries: 5100, budget_allocated: 777, scheme: "PM Vishwakarma" },
  { state: "Uttarakhand", year: 2018, beneficiaries: 11900, male_beneficiaries: 6400, female_beneficiaries: 5500, budget_allocated: 833, scheme: "PM Vishwakarma" },
  { state: "Uttarakhand", year: 2019, beneficiaries: 12800, male_beneficiaries: 6900, female_beneficiaries: 5900, budget_allocated: 896, scheme: "PM Vishwakarma" },
  { state: "Uttarakhand", year: 2020, beneficiaries: 10400, male_beneficiaries: 5600, female_beneficiaries: 4800, budget_allocated: 728, scheme: "PM Vishwakarma" },
  { state: "Uttarakhand", year: 2021, beneficiaries: 13900, male_beneficiaries: 7500, female_beneficiaries: 6400, budget_allocated: 973, scheme: "PM Vishwakarma" },
  { state: "Uttarakhand", year: 2022, beneficiaries: 15800, male_beneficiaries: 8500, female_beneficiaries: 7300, budget_allocated: 1106, scheme: "PM Vishwakarma" },

  // ──────────────────────── JAMMU & KASHMIR ────────────────────────
  { state: "Jammu & Kashmir", year: 2015, beneficiaries: 7800, male_beneficiaries: 4400, female_beneficiaries: 3400, budget_allocated: 546, scheme: "PM Vishwakarma" },
  { state: "Jammu & Kashmir", year: 2016, beneficiaries: 8300, male_beneficiaries: 4700, female_beneficiaries: 3600, budget_allocated: 581, scheme: "PM Vishwakarma" },
  { state: "Jammu & Kashmir", year: 2017, beneficiaries: 8900, male_beneficiaries: 5000, female_beneficiaries: 3900, budget_allocated: 623, scheme: "PM Vishwakarma" },
  { state: "Jammu & Kashmir", year: 2018, beneficiaries: 9400, male_beneficiaries: 5300, female_beneficiaries: 4100, budget_allocated: 658, scheme: "PM Vishwakarma" },
  { state: "Jammu & Kashmir", year: 2019, beneficiaries: 9800, male_beneficiaries: 5500, female_beneficiaries: 4300, budget_allocated: 686, scheme: "PM Vishwakarma" },
  { state: "Jammu & Kashmir", year: 2020, beneficiaries: 7200, male_beneficiaries: 4100, female_beneficiaries: 3100, budget_allocated: 504, scheme: "PM Vishwakarma" },
  { state: "Jammu & Kashmir", year: 2021, beneficiaries: 10800, male_beneficiaries: 6100, female_beneficiaries: 4700, budget_allocated: 756, scheme: "PM Vishwakarma" },
  { state: "Jammu & Kashmir", year: 2022, beneficiaries: 12200, male_beneficiaries: 6900, female_beneficiaries: 5300, budget_allocated: 854, scheme: "PM Vishwakarma" },

  // ──────────────────────── DELHI ────────────────────────
  { state: "Delhi", year: 2015, beneficiaries: 10200, male_beneficiaries: 5800, female_beneficiaries: 4400, budget_allocated: 714, scheme: "PM Vishwakarma" },
  { state: "Delhi", year: 2016, beneficiaries: 11100, male_beneficiaries: 6300, female_beneficiaries: 4800, budget_allocated: 777, scheme: "PM Vishwakarma" },
  { state: "Delhi", year: 2017, beneficiaries: 12300, male_beneficiaries: 7000, female_beneficiaries: 5300, budget_allocated: 861, scheme: "PM Vishwakarma" },
  { state: "Delhi", year: 2018, beneficiaries: 13400, male_beneficiaries: 7600, female_beneficiaries: 5800, budget_allocated: 938, scheme: "PM Vishwakarma" },
  { state: "Delhi", year: 2019, beneficiaries: 14600, male_beneficiaries: 8300, female_beneficiaries: 6300, budget_allocated: 1022, scheme: "PM Vishwakarma" },
  { state: "Delhi", year: 2020, beneficiaries: 11800, male_beneficiaries: 6700, female_beneficiaries: 5100, budget_allocated: 826, scheme: "PM Vishwakarma" },
  { state: "Delhi", year: 2021, beneficiaries: 15900, male_beneficiaries: 9000, female_beneficiaries: 6900, budget_allocated: 1113, scheme: "PM Vishwakarma" },
  { state: "Delhi", year: 2022, beneficiaries: 17800, male_beneficiaries: 10100, female_beneficiaries: 7700, budget_allocated: 1246, scheme: "PM Vishwakarma" },

  // ──────────────────────── TRIPURA ────────────────────────
  { state: "Tripura", year: 2015, beneficiaries: 3800, male_beneficiaries: 1800, female_beneficiaries: 2000, budget_allocated: 266, scheme: "PM Vishwakarma" },
  { state: "Tripura", year: 2016, beneficiaries: 4200, male_beneficiaries: 2000, female_beneficiaries: 2200, budget_allocated: 294, scheme: "PM Vishwakarma" },
  { state: "Tripura", year: 2017, beneficiaries: 4700, male_beneficiaries: 2200, female_beneficiaries: 2500, budget_allocated: 329, scheme: "PM Vishwakarma" },
  { state: "Tripura", year: 2018, beneficiaries: 5100, male_beneficiaries: 2400, female_beneficiaries: 2700, budget_allocated: 357, scheme: "PM Vishwakarma" },
  { state: "Tripura", year: 2019, beneficiaries: 5600, male_beneficiaries: 2700, female_beneficiaries: 2900, budget_allocated: 392, scheme: "PM Vishwakarma" },
  { state: "Tripura", year: 2020, beneficiaries: 4300, male_beneficiaries: 2100, female_beneficiaries: 2200, budget_allocated: 301, scheme: "PM Vishwakarma" },
  { state: "Tripura", year: 2021, beneficiaries: 6200, male_beneficiaries: 3000, female_beneficiaries: 3200, budget_allocated: 434, scheme: "PM Vishwakarma" },
  { state: "Tripura", year: 2022, beneficiaries: 7100, male_beneficiaries: 3400, female_beneficiaries: 3700, budget_allocated: 497, scheme: "PM Vishwakarma" },

  // ──────────────────────── MANIPUR ────────────────────────
  { state: "Manipur", year: 2015, beneficiaries: 1800, male_beneficiaries: 700, female_beneficiaries: 1100, budget_allocated: 126, scheme: "PM Vishwakarma" },
  { state: "Manipur", year: 2016, beneficiaries: 2100, male_beneficiaries: 800, female_beneficiaries: 1300, budget_allocated: 147, scheme: "PM Vishwakarma" },
  { state: "Manipur", year: 2017, beneficiaries: 2400, male_beneficiaries: 900, female_beneficiaries: 1500, budget_allocated: 168, scheme: "PM Vishwakarma" },
  { state: "Manipur", year: 2018, beneficiaries: 2700, male_beneficiaries: 1100, female_beneficiaries: 1600, budget_allocated: 189, scheme: "PM Vishwakarma" },
  { state: "Manipur", year: 2019, beneficiaries: 3000, male_beneficiaries: 1200, female_beneficiaries: 1800, budget_allocated: 210, scheme: "PM Vishwakarma" },
  { state: "Manipur", year: 2020, beneficiaries: 2200, male_beneficiaries: 900, female_beneficiaries: 1300, budget_allocated: 154, scheme: "PM Vishwakarma" },
  { state: "Manipur", year: 2021, beneficiaries: 3400, male_beneficiaries: 1400, female_beneficiaries: 2000, budget_allocated: 238, scheme: "PM Vishwakarma" },
  { state: "Manipur", year: 2022, beneficiaries: 4100, male_beneficiaries: 1700, female_beneficiaries: 2400, budget_allocated: 287, scheme: "PM Vishwakarma" },

  // ──────────────────────── MEGHALAYA ────────────────────────
  { state: "Meghalaya", year: 2015, beneficiaries: 1400, male_beneficiaries: 600, female_beneficiaries: 800, budget_allocated: 98, scheme: "PM Vishwakarma" },
  { state: "Meghalaya", year: 2016, beneficiaries: 1600, male_beneficiaries: 700, female_beneficiaries: 900, budget_allocated: 112, scheme: "PM Vishwakarma" },
  { state: "Meghalaya", year: 2017, beneficiaries: 1800, male_beneficiaries: 800, female_beneficiaries: 1000, budget_allocated: 126, scheme: "PM Vishwakarma" },
  { state: "Meghalaya", year: 2018, beneficiaries: 1900, male_beneficiaries: 800, female_beneficiaries: 1100, budget_allocated: 133, scheme: "PM Vishwakarma" },
  { state: "Meghalaya", year: 2019, beneficiaries: 2100, male_beneficiaries: 900, female_beneficiaries: 1200, budget_allocated: 147, scheme: "PM Vishwakarma" },
  { state: "Meghalaya", year: 2020, beneficiaries: 1600, male_beneficiaries: 700, female_beneficiaries: 900, budget_allocated: 112, scheme: "PM Vishwakarma" },
  { state: "Meghalaya", year: 2021, beneficiaries: 2300, male_beneficiaries: 1000, female_beneficiaries: 1300, budget_allocated: 161, scheme: "PM Vishwakarma" },
  { state: "Meghalaya", year: 2022, beneficiaries: 2800, male_beneficiaries: 1200, female_beneficiaries: 1600, budget_allocated: 196, scheme: "PM Vishwakarma" },

  // ──────────────────────── MIZORAM ────────────────────────
  { state: "Mizoram", year: 2015, beneficiaries: 900, male_beneficiaries: 400, female_beneficiaries: 500, budget_allocated: 63, scheme: "PM Vishwakarma" },
  { state: "Mizoram", year: 2016, beneficiaries: 1000, male_beneficiaries: 400, female_beneficiaries: 600, budget_allocated: 70, scheme: "PM Vishwakarma" },
  { state: "Mizoram", year: 2017, beneficiaries: 1100, male_beneficiaries: 500, female_beneficiaries: 600, budget_allocated: 77, scheme: "PM Vishwakarma" },
  { state: "Mizoram", year: 2018, beneficiaries: 1100, male_beneficiaries: 500, female_beneficiaries: 600, budget_allocated: 77, scheme: "PM Vishwakarma" },
  { state: "Mizoram", year: 2019, beneficiaries: 1200, male_beneficiaries: 500, female_beneficiaries: 700, budget_allocated: 84, scheme: "PM Vishwakarma" },
  { state: "Mizoram", year: 2020, beneficiaries: 900, male_beneficiaries: 400, female_beneficiaries: 500, budget_allocated: 63, scheme: "PM Vishwakarma" },
  { state: "Mizoram", year: 2021, beneficiaries: 1400, male_beneficiaries: 600, female_beneficiaries: 800, budget_allocated: 98, scheme: "PM Vishwakarma" },
  { state: "Mizoram", year: 2022, beneficiaries: 1700, male_beneficiaries: 700, female_beneficiaries: 1000, budget_allocated: 119, scheme: "PM Vishwakarma" },

  // ──────────────────────── NAGALAND ────────────────────────
  { state: "Nagaland", year: 2015, beneficiaries: 1000, male_beneficiaries: 400, female_beneficiaries: 600, budget_allocated: 70, scheme: "PM Vishwakarma" },
  { state: "Nagaland", year: 2016, beneficiaries: 1100, male_beneficiaries: 500, female_beneficiaries: 600, budget_allocated: 77, scheme: "PM Vishwakarma" },
  { state: "Nagaland", year: 2017, beneficiaries: 1200, male_beneficiaries: 500, female_beneficiaries: 700, budget_allocated: 84, scheme: "PM Vishwakarma" },
  { state: "Nagaland", year: 2018, beneficiaries: 1200, male_beneficiaries: 500, female_beneficiaries: 700, budget_allocated: 84, scheme: "PM Vishwakarma" },
  { state: "Nagaland", year: 2019, beneficiaries: 1300, male_beneficiaries: 600, female_beneficiaries: 700, budget_allocated: 91, scheme: "PM Vishwakarma" },
  { state: "Nagaland", year: 2020, beneficiaries: 1000, male_beneficiaries: 400, female_beneficiaries: 600, budget_allocated: 70, scheme: "PM Vishwakarma" },
  { state: "Nagaland", year: 2021, beneficiaries: 1500, male_beneficiaries: 700, female_beneficiaries: 800, budget_allocated: 105, scheme: "PM Vishwakarma" },
  { state: "Nagaland", year: 2022, beneficiaries: 1800, male_beneficiaries: 800, female_beneficiaries: 1000, budget_allocated: 126, scheme: "PM Vishwakarma" },

  // ──────────────────────── ARUNACHAL PRADESH ────────────────────────
  { state: "Arunachal Pradesh", year: 2015, beneficiaries: 800, male_beneficiaries: 400, female_beneficiaries: 400, budget_allocated: 56, scheme: "PM Vishwakarma" },
  { state: "Arunachal Pradesh", year: 2016, beneficiaries: 900, male_beneficiaries: 400, female_beneficiaries: 500, budget_allocated: 63, scheme: "PM Vishwakarma" },
  { state: "Arunachal Pradesh", year: 2017, beneficiaries: 1000, male_beneficiaries: 500, female_beneficiaries: 500, budget_allocated: 70, scheme: "PM Vishwakarma" },
  { state: "Arunachal Pradesh", year: 2018, beneficiaries: 1100, male_beneficiaries: 500, female_beneficiaries: 600, budget_allocated: 77, scheme: "PM Vishwakarma" },
  { state: "Arunachal Pradesh", year: 2019, beneficiaries: 1200, male_beneficiaries: 600, female_beneficiaries: 600, budget_allocated: 84, scheme: "PM Vishwakarma" },
  { state: "Arunachal Pradesh", year: 2020, beneficiaries: 900, male_beneficiaries: 400, female_beneficiaries: 500, budget_allocated: 63, scheme: "PM Vishwakarma" },
  { state: "Arunachal Pradesh", year: 2021, beneficiaries: 1400, male_beneficiaries: 700, female_beneficiaries: 700, budget_allocated: 98, scheme: "PM Vishwakarma" },
  { state: "Arunachal Pradesh", year: 2022, beneficiaries: 1600, male_beneficiaries: 800, female_beneficiaries: 800, budget_allocated: 112, scheme: "PM Vishwakarma" },

  // ──────────────────────── GOA ────────────────────────
  { state: "Goa", year: 2015, beneficiaries: 1200, male_beneficiaries: 700, female_beneficiaries: 500, budget_allocated: 84, scheme: "PM Vishwakarma" },
  { state: "Goa", year: 2016, beneficiaries: 1300, male_beneficiaries: 800, female_beneficiaries: 500, budget_allocated: 91, scheme: "PM Vishwakarma" },
  { state: "Goa", year: 2017, beneficiaries: 1400, male_beneficiaries: 800, female_beneficiaries: 600, budget_allocated: 98, scheme: "PM Vishwakarma" },
  { state: "Goa", year: 2018, beneficiaries: 1500, male_beneficiaries: 900, female_beneficiaries: 600, budget_allocated: 105, scheme: "PM Vishwakarma" },
  { state: "Goa", year: 2019, beneficiaries: 1600, male_beneficiaries: 900, female_beneficiaries: 700, budget_allocated: 112, scheme: "PM Vishwakarma" },
  { state: "Goa", year: 2020, beneficiaries: 1100, male_beneficiaries: 600, female_beneficiaries: 500, budget_allocated: 77, scheme: "PM Vishwakarma" },
  { state: "Goa", year: 2021, beneficiaries: 1800, male_beneficiaries: 1100, female_beneficiaries: 700, budget_allocated: 126, scheme: "PM Vishwakarma" },
  { state: "Goa", year: 2022, beneficiaries: 2200, male_beneficiaries: 1300, female_beneficiaries: 900, budget_allocated: 154, scheme: "PM Vishwakarma" },

  // ──────────────────────── SIKKIM ────────────────────────
  { state: "Sikkim", year: 2015, beneficiaries: 380, male_beneficiaries: 200, female_beneficiaries: 180, budget_allocated: 27, scheme: "PM Vishwakarma" },
  { state: "Sikkim", year: 2016, beneficiaries: 420, male_beneficiaries: 220, female_beneficiaries: 200, budget_allocated: 29, scheme: "PM Vishwakarma" },
  { state: "Sikkim", year: 2017, beneficiaries: 460, male_beneficiaries: 240, female_beneficiaries: 220, budget_allocated: 32, scheme: "PM Vishwakarma" },
  { state: "Sikkim", year: 2018, beneficiaries: 490, male_beneficiaries: 260, female_beneficiaries: 230, budget_allocated: 34, scheme: "PM Vishwakarma" },
  { state: "Sikkim", year: 2019, beneficiaries: 520, male_beneficiaries: 270, female_beneficiaries: 250, budget_allocated: 36, scheme: "PM Vishwakarma" },
  { state: "Sikkim", year: 2020, beneficiaries: 390, male_beneficiaries: 200, female_beneficiaries: 190, budget_allocated: 27, scheme: "PM Vishwakarma" },
  { state: "Sikkim", year: 2021, beneficiaries: 590, male_beneficiaries: 310, female_beneficiaries: 280, budget_allocated: 41, scheme: "PM Vishwakarma" },
  { state: "Sikkim", year: 2022, beneficiaries: 720, male_beneficiaries: 380, female_beneficiaries: 340, budget_allocated: 50, scheme: "PM Vishwakarma" },
];

module.exports = sampleData;
