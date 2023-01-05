<#macro emailLayout>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Email Test</title>
  </head>
  <body>
    <div style="padding: 0; margin: 0">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f6f9">
        <tbody>
          <tr>
            <td
              valign="top"
              align="center"
              style="
                border-top: 4px solid rgb(62, 135, 246);
                font-family: SalesforceSans, Helvetica Neue, Helvetica, Arial;
                font-size: 14px;
              "
            >
              <table cellpadding="0" cellspacing="0" border="0" style="width: 656px; border: 0; padding: 0; margin: 0">
                <tbody>
                  <tr>
                    <td style="border: 0; padding: 0; margin: 0">
                      <table
                        width="656"
                        cellpadding="0"
                        cellspacing="16"
                        border="0"
                        style="border: 0; padding: 0; margin: 0"
                      >
                        <tbody>
                          <tr>
                            <td align="center" style="border: 0; padding: 0; margin: 0; font-size: 0px">
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAAAoCAYAAADZs5l2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAACxKAAAsSgF3enRNAAAAB3RJTUUH5gUNBxMj8IQj9wAACeZJREFUeNrtnH2QVWUdxz/P3V1gl12WXViE5TXICAOWjCbAGXEcm0ZHS0dmbYaQkjFFUSZHXXqTtbBaKzVTRyGlEnpZs9SoJEELsijMEDAgcbUENnY32WVhl3259/TH75y955x77n2ec7h3EdjvDAPn3Pu83Of5Pr/3BxjAAAYwABWpVXVNtNHq63LT72mE4mnLyCsaG7pdW00s7We1m6LNpfYS+Ts/VKvgTSoGyoEyYIj9rhtoA94FjgIJT3sdGc5gjJg/jtbtVuh2pXWJQCJEJYAbZiRI3fwxwAXARUAVMA4oAQbZn/cCx4DDwB5gK/AHYD9gacgwDLgBGAWEXy09FNACPIoQFWAycJ1r/tlGDGgAftC8cUd3QXlVEbAEmIhzQNLPdROwEdITwcb7gcXAYM1cuoC19nwAExJ4CTABWARcA3wQKMjQsgwYD8wGPgP8B3gWWAPs9vTtJUMxcCOyMbnC28B6kiSYANxusIAng23Aj7oOb+kuKK/qQDb4NvQq+QrgU8A+/wcuKVAIrETWWYengWb3i/SKprrGTYACYCGwAVgFzCAzAfxQCOtvtfu42Z54ciwveiMutCnivmerv8aMHz/gPD8OPGXQbirwZWxVW1ongsOnBhYC1QZ97UfI0u5+GUwC76YMB76FnOAZWViMicD9wHcRaRE05pkL1bfkx4GvA28atKpGNhpIEsHGDGAFelXWBXwTeN3/QUzTsAx4ABFbhWQPBcBS4D6EZGcrdiMb06X53mDgi8B0gBGFffs4FPgqMMVgrJ8DP3EeHM8AgkiQPJGFiOhfnMNF+CwinoacZD+nFXzG3Xqg3qDZFGTDh3b2jnTeLQauMmi7B7gHOAFeAoCfBF6RvAS4vh/WZBb9Lw2ixUdODnnuBxcRTiAbtNegj6uAa+dV3gVwPlCD3rjvRA7zv9J9IV0HM4E7MDf+jgJvAf9FiHUOMAlx99IhDvwM+IrdLgy6gFaiuZAxoIlU41CHBnueUQgUA17LMOY+ZKPWkFntFlioO3e1XL93ZsWaWyyLCQZjrwN+4Tz4pQAEkyAPuAmMBjiGbOSTiMFxzF6kYmAaYsx8Gij1tWsF7gUeRAyksNiKeBphN9JBDz43yQAPAqsJG2BLIo5P97fVxNxG3lPAfPTSd9Lk0g0/BEYbjLkTsTm6IZgAeH5QUhV8CPFLdTiMSIufkupenUA26mXgeeDbSDADROytAJ7DfZLr68J4CO3I6UmYNsgCTiCiNatwEaEb8cI+hkjiFFiWYkzxNmv6yMcnGMjAY8DXEAmdEUGsvgw9yzoQa/XJvjfugE9yMxPAM0j4eA0iUu/ACRb525lDISI2cdIhaHPiqZOYrykaELdxLSJN+2ChGJJ/xJpbebdVMuigsvQkWIsE54D0UgBSSVAIXGww2acRq5bAhXGekwu8BViASI+mtO2iIFfJrFR48x9ZHNOnFp5B1MIy93cUUFXxqDVx2MaYAQFeQaRvL2QmAKSSoBIJB2dCO/AEtp7JuJheEb/LZEEMoRDbJYphmIjY7gokn6GLrfhhIYbZnkxfchGhF7GX5gIfAVED40q2Wh8+5wEVw9JNvg24G3jHdIJ+EowHRmja/BPYYbwEuRGfH0UM0rA2gUKMu+cjjHm5/ScK9qAhAXiI8A6ykess1LCighZrbmWtNbSgyUQKrAZ+6zzopACkkmA0+sDNXpzEy6lLCVcCV0Zs+2I/zzVONMnzG2C1InF7VcVDjC950YQAf0ZC8gkwIwCkirZi9OKuOeKPeq+gPz2K0HAFkRLt3eq+KcOf/eusUY8og+BEKyI9GsOO6d/wUxFJG0AaJCzieao3rsx4GzkT6idBB/pTPpIBsuQMLi9BlQ5m+RtHrp63s/mGhIHoLQPuQozXUPCToAl9RmsqUkV09qR/Tw0+AdbSBDFebVquDrRfaBnohPnAcuxDalp65jcMDyC6JVOw6Dwkh/2y0QjpiHLqjMqoUuzHwGZ8iSADWMDfTb7okgKVSHa1TGHR0TNK/aWx1hpRWG0V5bcojVRYisRlNppO0E+Cg0iRQyYSlCIp4G1AnOqa9BvqJcA0JCG10/NZNDLsRdKvUYy8v0UZEPgTQoScwEWAPKR+Y47zQimLA+0XqX803ZqYV7lSaTR2GUKgnUBj7abwwaKjSMz/As2crwFewMmDBxHBS4CpSIBpNBLPXo8TbMpEovTYA9TSv16KSIAcSDBfpdBlBCSRLBSvNd+kxhZvTUwqfUHnLs5FiLQCiOuIEJQ72IAUeg7PMEgJEpbswolPp7cP5iIVRA6zH7H/fQ9SfBqFCE7EMNd1ganIhh2U/reOR05xSgpeYdHZM0Jta6xlZOHrFBcc0p2AzyNq4dcg9oE+i5jEK0iZ8wLNT5mAnO4nkJO9H/EuQHIQk4CrEVaPc7UbYk/wfKSW4Pe4y9Czt6DZRh5iSEdNJTsunGfvXFIgH7gTO1QcBKUsDh2bp3a3XHdgTuWqUVgZ6wqHId7CDjQh5OQPSsb5u4CHkURSueaHlSOl2tciqd1G5JSOBs4ls20xG6l5+x7wfeBIxMXtL9wIXEo0w9K567ACOOS89KmBKxFbKyMs+HdD2+VL5lSuugV9yn82krW9DehNJw3SsXoL8BiSLjbBKCL4pwiJbgZ+B2yP0L4/Md3+ExVNSPVQECYj9YPFmj56FdZ3ZlU8vNmyaEWk6XhNm88Bf0Qyv4HwxgmSojWBlIQ/l60VTINuoA5DF+o0h0cVuKTAIKRWcKZBH78C1m49WIeSNbsXvV1UjBDsfRAcO0jNEySJ8D/gC8BLOVqUHvtHPMR7PJ6fbfjUwALkVpcOTsHJ8cL8ZodNa5H6Ax2qEKINglQi6JJFDcgdvV+SXXfMKX1ahUldwpmLDyDGse5ORzdSK7gLoKWz7w6Qc4GlAT0WIYY64CVCMAm8G/I2Un6+kvBVwUHYbfeXvHRxdhJgCPAlJIimQz2uSi7fvYWdSG1it6aPIoRw5/o/SC8JvBvTijDuk4hLGJYMFuJCfsPuox6nUjiYADo3LGzoVgdFuLuVUZAPKBXr8+oWYXaBdB8SU+mEJAF8Vv46zO41nocc5iL/xNIjtVZwO/Cq3dnHgQuRcrQKRKTFkA3vQURVI3LyX0Kupr8V2L8XHciVqTEE2wp5SCwjm+qpESH34Cz360AhLnBbfulUkOtjFcjmxTO0AdH5gRdTai/pE+udiHptRTbYytBnBzAWeMN5aRb48NYKxhHdtAvx70cil02GI0Rw/m+Cd5EClFb8m5lZ/LciYrI/sQ9JvOQcJdMXEu+wOhB1GIpwmf63EuSG0TLDrjyxDvPoV3BJeQ9yisyqWc5O3e9Bx5ubGTzm4tDSJh0BXNIgDE7nyrABDGAAOcH/AV1myXmJFxTWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA1LTEzVDA3OjE5OjEzKzAwOjAwD4K1KAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNS0xM1QwNzoxOToxMyswMDowMH7fDZQAAAAASUVORK5CYII="
                                style="display: block"
                                border="0"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="border: 0; padding: 0; margin: 0">
                      <div
                        style="border-radius: 8px 8px 0 0; width: 100%; height: 8px; background-color: #80bc00"
                      ></div>
                      <table
                        width="656"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="border: 0; padding: 0; margin: 0"
                      >
                        <tbody>
                          <tr>
                            <td width="656">
                              <table width="656" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      bgcolor="#4B9EE4"
                                      style="
                                        width: 650px;
                                        background: #80bc00;
                                        color: #ffffff;
                                        font-family: SalesforceSansLight, Helvetica Neue, Helvetica, Arial;
                                        font-size: 32px;
                                        padding: 16px 0 16px 0;
                                      "
                                    >
                                      <span style="padding: 0 20px; display: block"
                                        >${msg("appTitle")}</span
                                      >
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td bgcolor="#ffffff" width="650">
                              <table
                                width="650"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="border: 0; padding: 0; margin: 0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        width: 650px;
                                        background: #ffffff;
                                        color: rgb(62, 135, 246);
                                        font-family: SalesforceSans, Helvetica Neue, Helvetica, Arial;
                                        font-size: 14px;
                                        padding: 0 0 20px 0;
                                        line-height: 150%;
                                      "
                                    >
                                      <span style="padding: 0 20px; display: block">
                                        &nbsp;<br />
                                        <#nested>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div style="border-radius: 0 0 8px 8px; width: 100%; height: 8px; background-color: white"></div>
                    </td>
                  </tr>

                  <tr>
                    <td style="border: 0; padding: 0; margin: 0">
                      <table
                        width="656"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="border: 0; padding: 0; margin: 0"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              style="
                                width: 656px;
                                padding: 20px;
                                font-family: SalesforceSans, Helvetica Neue, Helvetica, Arial;
                                font-size: 12px;
                                color: #798188;
                              "
                            >
                              © ${.now?string.yyyy} CFEX, inc. All rights reserved.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
</#macro>
