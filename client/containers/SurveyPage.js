import React, { Component } from 'react';
import { Form, Input, InputNumber, Progress, Checkbox, Button, Select, Radio } from 'antd';
const FormItem = Form.Item;

const RadioGroup = Radio.Group;
import client from '../api/client';


const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
};

class SurveyPage extends Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      organisation: ''
    };
  }

  onSelectOrg = (value) => {
    this.setState({
      organisation: value
    });
  }
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        client.createUser(values);
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const currentYear = new Date().getFullYear();
    return (
      <div class="home-page">
        <h1 class="text-center">Ashoka Changemaker Questionnaire</h1>
        <br />
        <hr class="divider"/>
        <h2 class="slogan"><Progress percent={30}/></h2>


        <Form>
          <h2>Section 1 - About You</h2>
          <hr className="divider secondary" />
          <FormItem
            {...formItemLayout}
            label="First Name">
            { getFieldDecorator('firstName')(
                <Input placeholder="First Name" />
              )
            }
          </FormItem>

        <FormItem
          {...formItemLayout}
          label="Surname"
        >
          { getFieldDecorator('lastName')(
              <Input placeholder="Surname"/>
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Email"
        >
          { getFieldDecorator('email')(
              <Input placeholder="Email"/>
            )
          }
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="Primary Phone Number"
          >
          { getFieldDecorator('primaryDialCode')(
              <Input addonBefore="+353"/>
            )
          }
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="Secondary Phone Number"
            >
            { getFieldDecorator('secondaryDialCode')(
                <Input addonBefore="+353"/>
              )
            }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Website"
            >
              { getFieldDecorator('website1')(
                  <Input placeholder="Website 1"/>
                )
              }
              <p>
                { getFieldDecorator('website2')(
                    <Input placeholder="Website 2"/>
                  )
                }
              </p>
              <Checkbox>I don't have a website.</Checkbox>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Twitter Username"
            >
              { getFieldDecorator('twitterHandle')(
                  <Input addonBefore="@"/>
                )
              }
              <Checkbox>I don't have one.</Checkbox>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Facebook Profile"
            >
              { getFieldDecorator('facebookProfile')(
                  <Input placeholder="Facebook Profile"/>
                )
              }
              <Checkbox>I don't have one.</Checkbox>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Gender"
            >
              { getFieldDecorator('gender')(
                  <Select placeholder="Select a gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Year of Birth"
            >
              <InputNumber defaultValue={currentYear} min={1900} max={currentYear} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="What is Your Nationality?"
            >
              { getFieldDecorator('nationality')(
                <Select placeholder="Select a nationality">
                  <Option value="Irish">Irish</Option>
                  <Option value="Northern Irish">Northern Irish</Option>
                  <Option value="British">British</Option>
                  <Option value="English">English</Option>
                  <Option value="Scottish">Scottish</Option>
                  <Option value="Welsh">Welsh</Option>
                  <Option value="afghan">Afghan</Option>
                  <Option value="albanian">Albanian</Option>
                  <Option value="algerian">Algerian</Option>
                  <Option value="american">American</Option>
                  <Option value="andorran">Andorran</Option>
                  <Option value="angolan">Angolan</Option>
                  <Option value="antiguans">Antiguans</Option>
                  <Option value="argentinean">Argentinean</Option>
                  <Option value="armenian">Armenian</Option>
                  <Option value="australian">Australian</Option>
                  <Option value="austrian">Austrian</Option>
                  <Option value="azerbaijani">Azerbaijani</Option>
                  <Option value="bahamian">Bahamian</Option>
                  <Option value="bahraini">Bahraini</Option>
                  <Option value="bangladeshi">Bangladeshi</Option>
                  <Option value="barbadian">Barbadian</Option>
                  <Option value="barbudans">Barbudans</Option>
                  <Option value="batswana">Batswana</Option>
                  <Option value="belarusian">Belarusian</Option>
                  <Option value="belgian">Belgian</Option>
                  <Option value="belizean">Belizean</Option>
                  <Option value="beninese">Beninese</Option>
                  <Option value="bhutanese">Bhutanese</Option>
                  <Option value="bolivian">Bolivian</Option>
                  <Option value="bosnian">Bosnian</Option>
                  <Option value="brazilian">Brazilian</Option>
                  <Option value="british">British</Option>
                  <Option value="bruneian">Bruneian</Option>
                  <Option value="bulgarian">Bulgarian</Option>
                  <Option value="burkinabe">Burkinabe</Option>
                  <Option value="burmese">Burmese</Option>
                  <Option value="burundian">Burundian</Option>
                  <Option value="cambodian">Cambodian</Option>
                  <Option value="cameroonian">Cameroonian</Option>
                  <Option value="canadian">Canadian</Option>
                  <Option value="cape verdean">Cape Verdean</Option>
                  <Option value="central african">Central African</Option>
                  <Option value="chadian">Chadian</Option>
                  <Option value="chilean">Chilean</Option>
                  <Option value="chinese">Chinese</Option>
                  <Option value="colombian">Colombian</Option>
                  <Option value="comoran">Comoran</Option>
                  <Option value="congolese">Congolese</Option>
                  <Option value="costa rican">Costa Rican</Option>
                  <Option value="croatian">Croatian</Option>
                  <Option value="cuban">Cuban</Option>
                  <Option value="cypriot">Cypriot</Option>
                  <Option value="czech">Czech</Option>
                  <Option value="danish">Danish</Option>
                  <Option value="djibouti">Djibouti</Option>
                  <Option value="dominican">Dominican</Option>
                  <Option value="dutch">Dutch</Option>
                  <Option value="east timorese">East Timorese</Option>
                  <Option value="ecuadorean">Ecuadorean</Option>
                  <Option value="egyptian">Egyptian</Option>
                  <Option value="emirian">Emirian</Option>
                  <Option value="equatorial guinean">Equatorial Guinean</Option>
                  <Option value="eritrean">Eritrean</Option>
                  <Option value="estonian">Estonian</Option>
                  <Option value="ethiopian">Ethiopian</Option>
                  <Option value="fijian">Fijian</Option>
                  <Option value="filipino">Filipino</Option>
                  <Option value="finnish">Finnish</Option>
                  <Option value="french">French</Option>
                  <Option value="gabonese">Gabonese</Option>
                  <Option value="gambian">Gambian</Option>
                  <Option value="georgian">Georgian</Option>
                  <Option value="german">German</Option>
                  <Option value="ghanaian">Ghanaian</Option>
                  <Option value="greek">Greek</Option>
                  <Option value="grenadian">Grenadian</Option>
                  <Option value="guatemalan">Guatemalan</Option>
                  <Option value="guinea-bissauan">Guinea-Bissauan</Option>
                  <Option value="guinean">Guinean</Option>
                  <Option value="guyanese">Guyanese</Option>
                  <Option value="haitian">Haitian</Option>
                  <Option value="herzegovinian">Herzegovinian</Option>
                  <Option value="honduran">Honduran</Option>
                  <Option value="hungarian">Hungarian</Option>
                  <Option value="icelander">Icelander</Option>
                  <Option value="indian">Indian</Option>
                  <Option value="indonesian">Indonesian</Option>
                  <Option value="iranian">Iranian</Option>
                  <Option value="iraqi">Iraqi</Option>
                  <Option value="irish">Irish</Option>
                  <Option value="israeli">Israeli</Option>
                  <Option value="italian">Italian</Option>
                  <Option value="ivorian">Ivorian</Option>
                  <Option value="jamaican">Jamaican</Option>
                  <Option value="japanese">Japanese</Option>
                  <Option value="jordanian">Jordanian</Option>
                  <Option value="kazakhstani">Kazakhstani</Option>
                  <Option value="kenyan">Kenyan</Option>
                  <Option value="kittian and nevisian">Kittian and Nevisian</Option>
                  <Option value="kuwaiti">Kuwaiti</Option>
                  <Option value="kyrgyz">Kyrgyz</Option>
                  <Option value="laotian">Laotian</Option>
                  <Option value="latvian">Latvian</Option>
                  <Option value="lebanese">Lebanese</Option>
                  <Option value="liberian">Liberian</Option>
                  <Option value="libyan">Libyan</Option>
                  <Option value="liechtensteiner">Liechtensteiner</Option>
                  <Option value="lithuanian">Lithuanian</Option>
                  <Option value="luxembourger">Luxembourger</Option>
                  <Option value="macedonian">Macedonian</Option>
                  <Option value="malagasy">Malagasy</Option>
                  <Option value="malawian">Malawian</Option>
                  <Option value="malaysian">Malaysian</Option>
                  <Option value="maldivan">Maldivan</Option>
                  <Option value="malian">Malian</Option>
                  <Option value="maltese">Maltese</Option>
                  <Option value="marshallese">Marshallese</Option>
                  <Option value="mauritanian">Mauritanian</Option>
                  <Option value="mauritian">Mauritian</Option>
                  <Option value="mexican">Mexican</Option>
                  <Option value="micronesian">Micronesian</Option>
                  <Option value="moldovan">Moldovan</Option>
                  <Option value="monacan">Monacan</Option>
                  <Option value="mongolian">Mongolian</Option>
                  <Option value="moroccan">Moroccan</Option>
                  <Option value="mosotho">Mosotho</Option>
                  <Option value="motswana">Motswana</Option>
                  <Option value="mozambican">Mozambican</Option>
                  <Option value="namibian">Namibian</Option>
                  <Option value="nauruan">Nauruan</Option>
                  <Option value="nepalese">Nepalese</Option>
                  <Option value="new zealander">New Zealander</Option>
                  <Option value="ni-vanuatu">Ni-Vanuatu</Option>
                  <Option value="nicaraguan">Nicaraguan</Option>
                  <Option value="nigerien">Nigerien</Option>
                  <Option value="north korean">North Korean</Option>
                  <Option value="northern irish">Northern Irish</Option>
                  <Option value="norwegian">Norwegian</Option>
                  <Option value="omani">Omani</Option>
                  <Option value="pakistani">Pakistani</Option>
                  <Option value="palauan">Palauan</Option>
                  <Option value="panamanian">Panamanian</Option>
                  <Option value="papua new guinean">Papua New Guinean</Option>
                  <Option value="paraguayan">Paraguayan</Option>
                  <Option value="peruvian">Peruvian</Option>
                  <Option value="polish">Polish</Option>
                  <Option value="portuguese">Portuguese</Option>
                  <Option value="qatari">Qatari</Option>
                  <Option value="romanian">Romanian</Option>
                  <Option value="russian">Russian</Option>
                  <Option value="rwandan">Rwandan</Option>
                  <Option value="saint lucian">Saint Lucian</Option>
                  <Option value="salvadoran">Salvadoran</Option>
                  <Option value="samoan">Samoan</Option>
                  <Option value="san marinese">San Marinese</Option>
                  <Option value="sao tomean">Sao Tomean</Option>
                  <Option value="saudi">Saudi</Option>
                  <Option value="scottish">Scottish</Option>
                  <Option value="senegalese">Senegalese</Option>
                  <Option value="serbian">Serbian</Option>
                  <Option value="seychellois">Seychellois</Option>
                  <Option value="sierra leonean">Sierra Leonean</Option>
                  <Option value="singaporean">Singaporean</Option>
                  <Option value="slovakian">Slovakian</Option>
                  <Option value="slovenian">Slovenian</Option>
                  <Option value="solomon islander">Solomon Islander</Option>
                  <Option value="somali">Somali</Option>
                  <Option value="south african">South African</Option>
                  <Option value="south korean">South Korean</Option>
                  <Option value="spanish">Spanish</Option>
                  <Option value="sri lankan">Sri Lankan</Option>
                  <Option value="sudanese">Sudanese</Option>
                  <Option value="surinamer">Surinamer</Option>
                  <Option value="swazi">Swazi</Option>
                  <Option value="swedish">Swedish</Option>
                  <Option value="swiss">Swiss</Option>
                  <Option value="syrian">Syrian</Option>
                  <Option value="taiwanese">Taiwanese</Option>
                  <Option value="tajik">Tajik</Option>
                  <Option value="tanzanian">Tanzanian</Option>
                  <Option value="thai">Thai</Option>
                  <Option value="togolese">Togolese</Option>
                  <Option value="tongan">Tongan</Option>
                  <Option value="trinidadian or tobagonian">Trinidadian or Tobagonian</Option>
                  <Option value="tunisian">Tunisian</Option>
                  <Option value="turkish">Turkish</Option>
                  <Option value="tuvaluan">Tuvaluan</Option>
                  <Option value="ugandan">Ugandan</Option>
                  <Option value="ukrainian">Ukrainian</Option>
                  <Option value="uruguayan">Uruguayan</Option>
                  <Option value="uzbekistani">Uzbekistani</Option>
                  <Option value="venezuelan">Venezuelan</Option>
                  <Option value="vietnamese">Vietnamese</Option>
                  <Option value="welsh">Welsh</Option>
                  <Option value="yemenite">Yemenite</Option>
                  <Option value="zambian">Zambian</Option>
                  <Option value="zimbabwean">Zimbabwean</Option>
                </Select>
                )
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="In which country do you live?"
            >
              { getFieldDecorator('countryOfResidence')(
                <Select placeholder="Select a country">
                  <Option value="Republic of Ireland">Republic of Ireland</Option>
                  <Option value="Northern Ireland">Northern Ireland</Option>
                  <Option value="United Kingdom">United Kingdom</Option>
                  <Option value="Afganistan">Afghanistan</Option>
                  <Option value="Albania">Albania</Option>
                  <Option value="Algeria">Algeria</Option>
                  <Option value="American Samoa">American Samoa</Option>
                  <Option value="Andorra">Andorra</Option>
                  <Option value="Angola">Angola</Option>
                  <Option value="Anguilla">Anguilla</Option>
                  <Option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</Option>
                  <Option value="Argentina">Argentina</Option>
                  <Option value="Armenia">Armenia</Option>
                  <Option value="Aruba">Aruba</Option>
                  <Option value="Australia">Australia</Option>
                  <Option value="Austria">Austria</Option>
                  <Option value="Azerbaijan">Azerbaijan</Option>
                  <Option value="Bahamas">Bahamas</Option>
                  <Option value="Bahrain">Bahrain</Option>
                  <Option value="Bangladesh">Bangladesh</Option>
                  <Option value="Barbados">Barbados</Option>
                  <Option value="Belarus">Belarus</Option>
                  <Option value="Belgium">Belgium</Option>
                  <Option value="Belize">Belize</Option>
                  <Option value="Benin">Benin</Option>
                  <Option value="Bermuda">Bermuda</Option>
                  <Option value="Bhutan">Bhutan</Option>
                  <Option value="Bolivia">Bolivia</Option>
                  <Option value="Bonaire">Bonaire</Option>
                  <Option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</Option>
                  <Option value="Botswana">Botswana</Option>
                  <Option value="Brazil">Brazil</Option>
                  <Option value="British Indian Ocean Ter">British Indian Ocean Ter</Option>
                  <Option value="Brunei">Brunei</Option>
                  <Option value="Bulgaria">Bulgaria</Option>
                  <Option value="Burkina Faso">Burkina Faso</Option>
                  <Option value="Burundi">Burundi</Option>
                  <Option value="Cambodia">Cambodia</Option>
                  <Option value="Cameroon">Cameroon</Option>
                  <Option value="Canada">Canada</Option>
                  <Option value="Canary Islands">Canary Islands</Option>
                  <Option value="Cape Verde">Cape Verde</Option>
                  <Option value="Cayman Islands">Cayman Islands</Option>
                  <Option value="Central African Republic">Central African Republic</Option>
                  <Option value="Chad">Chad</Option>
                  <Option value="Channel Islands">Channel Islands</Option>
                  <Option value="Chile">Chile</Option>
                  <Option value="China">China</Option>
                  <Option value="Christmas Island">Christmas Island</Option>
                  <Option value="Cocos Island">Cocos Island</Option>
                  <Option value="Colombia">Colombia</Option>
                  <Option value="Comoros">Comoros</Option>
                  <Option value="Congo">Congo</Option>
                  <Option value="Cook Islands">Cook Islands</Option>
                  <Option value="Costa Rica">Costa Rica</Option>
                  <Option value="Cote DIvoire">Cote D'Ivoire</Option>
                  <Option value="Croatia">Croatia</Option>
                  <Option value="Cuba">Cuba</Option>
                  <Option value="Curaco">Curacao</Option>
                  <Option value="Cyprus">Cyprus</Option>
                  <Option value="Czech Republic">Czech Republic</Option>
                  <Option value="Denmark">Denmark</Option>
                  <Option value="Djibouti">Djibouti</Option>
                  <Option value="Dominica">Dominica</Option>
                  <Option value="Dominican Republic">Dominican Republic</Option>
                  <Option value="East Timor">East Timor</Option>
                  <Option value="Ecuador">Ecuador</Option>
                  <Option value="Egypt">Egypt</Option>
                  <Option value="El Salvador">El Salvador</Option>
                  <Option value="Equatorial Guinea">Equatorial Guinea</Option>
                  <Option value="Eritrea">Eritrea</Option>
                  <Option value="Estonia">Estonia</Option>
                  <Option value="Ethiopia">Ethiopia</Option>
                  <Option value="Falkland Islands">Falkland Islands</Option>
                  <Option value="Faroe Islands">Faroe Islands</Option>
                  <Option value="Fiji">Fiji</Option>
                  <Option value="Finland">Finland</Option>
                  <Option value="France">France</Option>
                  <Option value="French Guiana">French Guiana</Option>
                  <Option value="French Polynesia">French Polynesia</Option>
                  <Option value="French Southern Ter">French Southern Ter</Option>
                  <Option value="Gabon">Gabon</Option>
                  <Option value="Gambia">Gambia</Option>
                  <Option value="Georgia">Georgia</Option>
                  <Option value="Germany">Germany</Option>
                  <Option value="Ghana">Ghana</Option>
                  <Option value="Gibraltar">Gibraltar</Option>
                  <Option value="Great Britain">Great Britain</Option>
                  <Option value="Greece">Greece</Option>
                  <Option value="Greenland">Greenland</Option>
                  <Option value="Grenada">Grenada</Option>
                  <Option value="Guadeloupe">Guadeloupe</Option>
                  <Option value="Guam">Guam</Option>
                  <Option value="Guatemala">Guatemala</Option>
                  <Option value="Guinea">Guinea</Option>
                  <Option value="Guyana">Guyana</Option>
                  <Option value="Haiti">Haiti</Option>
                  <Option value="Hawaii">Hawaii</Option>
                  <Option value="Honduras">Honduras</Option>
                  <Option value="Hong Kong">Hong Kong</Option>
                  <Option value="Hungary">Hungary</Option>
                  <Option value="Iceland">Iceland</Option>
                  <Option value="India">India</Option>
                  <Option value="Indonesia">Indonesia</Option>
                  <Option value="Iran">Iran</Option>
                  <Option value="Iraq">Iraq</Option>
                  <Option value="Ireland">Ireland</Option>
                  <Option value="Isle of Man">Isle of Man</Option>
                  <Option value="Israel">Israel</Option>
                  <Option value="Italy">Italy</Option>
                  <Option value="Jamaica">Jamaica</Option>
                  <Option value="Japan">Japan</Option>
                  <Option value="Jordan">Jordan</Option>
                  <Option value="Kazakhstan">Kazakhstan</Option>
                  <Option value="Kenya">Kenya</Option>
                  <Option value="Kiribati">Kiribati</Option>
                  <Option value="Korea North">Korea North</Option>
                  <Option value="Korea Sout">Korea South</Option>
                  <Option value="Kuwait">Kuwait</Option>
                  <Option value="Kyrgyzstan">Kyrgyzstan</Option>
                  <Option value="Laos">Laos</Option>
                  <Option value="Latvia">Latvia</Option>
                  <Option value="Lebanon">Lebanon</Option>
                  <Option value="Lesotho">Lesotho</Option>
                  <Option value="Liberia">Liberia</Option>
                  <Option value="Libya">Libya</Option>
                  <Option value="Liechtenstein">Liechtenstein</Option>
                  <Option value="Lithuania">Lithuania</Option>
                  <Option value="Luxembourg">Luxembourg</Option>
                  <Option value="Macau">Macau</Option>
                  <Option value="Macedonia">Macedonia</Option>
                  <Option value="Madagascar">Madagascar</Option>
                  <Option value="Malaysia">Malaysia</Option>
                  <Option value="Malawi">Malawi</Option>
                  <Option value="Maldives">Maldives</Option>
                  <Option value="Mali">Mali</Option>
                  <Option value="Malta">Malta</Option>
                  <Option value="Marshall Islands">Marshall Islands</Option>
                  <Option value="Martinique">Martinique</Option>
                  <Option value="Mauritania">Mauritania</Option>
                  <Option value="Mauritius">Mauritius</Option>
                  <Option value="Mayotte">Mayotte</Option>
                  <Option value="Mexico">Mexico</Option>
                  <Option value="Midway Islands">Midway Islands</Option>
                  <Option value="Moldova">Moldova</Option>
                  <Option value="Monaco">Monaco</Option>
                  <Option value="Mongolia">Mongolia</Option>
                  <Option value="Montserrat">Montserrat</Option>
                  <Option value="Morocco">Morocco</Option>
                  <Option value="Mozambique">Mozambique</Option>
                  <Option value="Myanmar">Myanmar</Option>
                  <Option value="Nambia">Nambia</Option>
                  <Option value="Nauru">Nauru</Option>
                  <Option value="Nepal">Nepal</Option>
                  <Option value="Netherland Antilles">Netherland Antilles</Option>
                  <Option value="Netherlands">Netherlands (Holland, Europe)</Option>
                  <Option value="Nevis">Nevis</Option>
                  <Option value="New Caledonia">New Caledonia</Option>
                  <Option value="New Zealand">New Zealand</Option>
                  <Option value="Nicaragua">Nicaragua</Option>
                  <Option value="Niger">Niger</Option>
                  <Option value="Nigeria">Nigeria</Option>
                  <Option value="Niue">Niue</Option>
                  <Option value="Norfolk Island">Norfolk Island</Option>
                  <Option value="Norway">Norway</Option>
                  <Option value="Oman">Oman</Option>
                  <Option value="Pakistan">Pakistan</Option>
                  <Option value="Palau Island">Palau Island</Option>
                  <Option value="Palestine">Palestine</Option>
                  <Option value="Panama">Panama</Option>
                  <Option value="Papua New Guinea">Papua New Guinea</Option>
                  <Option value="Paraguay">Paraguay</Option>
                  <Option value="Peru">Peru</Option>
                  <Option value="Phillipines">Philippines</Option>
                  <Option value="Pitcairn Island">Pitcairn Island</Option>
                  <Option value="Poland">Poland</Option>
                  <Option value="Portugal">Portugal</Option>
                  <Option value="Puerto Rico">Puerto Rico</Option>
                  <Option value="Qatar">Qatar</Option>
                  <Option value="Republic of Montenegro">Republic of Montenegro</Option>
                  <Option value="Republic of Serbia">Republic of Serbia</Option>
                  <Option value="Reunion">Reunion</Option>
                  <Option value="Romania">Romania</Option>
                  <Option value="Russia">Russia</Option>
                  <Option value="Rwanda">Rwanda</Option>
                  <Option value="St Barthelemy">St Barthelemy</Option>
                  <Option value="St Eustatius">St Eustatius</Option>
                  <Option value="St Helena">St Helena</Option>
                  <Option value="St Kitts-Nevis">St Kitts-Nevis</Option>
                  <Option value="St Lucia">St Lucia</Option>
                  <Option value="St Maarten">St Maarten</Option>
                  <Option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</Option>
                  <Option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</Option>
                  <Option value="Saipan">Saipan</Option>
                  <Option value="Samoa">Samoa</Option>
                  <Option value="Samoa American">Samoa American</Option>
                  <Option value="San Marino">San Marino</Option>
                  <Option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</Option>
                  <Option value="Saudi Arabia">Saudi Arabia</Option>
                  <Option value="Senegal">Senegal</Option>
                  <Option value="Serbia">Serbia</Option>
                  <Option value="Seychelles">Seychelles</Option>
                  <Option value="Sierra Leone">Sierra Leone</Option>
                  <Option value="Singapore">Singapore</Option>
                  <Option value="Slovakia">Slovakia</Option>
                  <Option value="Slovenia">Slovenia</Option>
                  <Option value="Solomon Islands">Solomon Islands</Option>
                  <Option value="Somalia">Somalia</Option>
                  <Option value="South Africa">South Africa</Option>
                  <Option value="Spain">Spain</Option>
                  <Option value="Sri Lanka">Sri Lanka</Option>
                  <Option value="Sudan">Sudan</Option>
                  <Option value="Suriname">Suriname</Option>
                  <Option value="Swaziland">Swaziland</Option>
                  <Option value="Sweden">Sweden</Option>
                  <Option value="Switzerland">Switzerland</Option>
                  <Option value="Syria">Syria</Option>
                  <Option value="Tahiti">Tahiti</Option>
                  <Option value="Taiwan">Taiwan</Option>
                  <Option value="Tajikistan">Tajikistan</Option>
                  <Option value="Tanzania">Tanzania</Option>
                  <Option value="Thailand">Thailand</Option>
                  <Option value="Togo">Togo</Option>
                  <Option value="Tokelau">Tokelau</Option>
                  <Option value="Tonga">Tonga</Option>
                  <Option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</Option>
                  <Option value="Tunisia">Tunisia</Option>
                  <Option value="Turkey">Turkey</Option>
                  <Option value="Turkmenistan">Turkmenistan</Option>
                  <Option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</Option>
                  <Option value="Tuvalu">Tuvalu</Option>
                  <Option value="Uganda">Uganda</Option>
                  <Option value="Ukraine">Ukraine</Option>
                  <Option value="United Arab Erimates">United Arab Emirates</Option>
                  <Option value="United Kingdom">United Kingdom</Option>
                  <Option value="United States of America">United States of America</Option>
                  <Option value="Uraguay">Uruguay</Option>
                  <Option value="Uzbekistan">Uzbekistan</Option>
                  <Option value="Vanuatu">Vanuatu</Option>
                  <Option value="Vatican City State">Vatican City State</Option>
                  <Option value="Venezuela">Venezuela</Option>
                  <Option value="Vietnam">Vietnam</Option>
                  <Option value="Virgin Islands (Brit)">Virgin Islands (Brit)</Option>
                  <Option value="Virgin Islands (USA)">Virgin Islands (USA)</Option>
                  <Option value="Wake Island">Wake Island</Option>
                  <Option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</Option>
                  <Option value="Yemen">Yemen</Option>
                  <Option value="Zaire">Zaire</Option>
                  <Option value="Zambia">Zambia</Option>
                  <Option value="Zimbabwe">Zimbabwe</Option>
                </Select>
                )
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Do you work from an office or home?"
            >
              <Select placeholder="Select place of work">
                <Option value="office">Office</Option>
                <Option value="home">Home</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="(If office) Office Location"
            >
              <Select placeholder="Select location of office">
                <Option value="Antrim">Antrim</Option>
                <Option value="Armagh">Armagh</Option>
                <Option value="Carlow">Carlow</Option>
                <Option value="Cavan">Cavan</Option>
                <Option value="Clare">Clare</Option>
                <Option value="Cork">Cork</Option>
                <Option value="Derry">Derry</Option>
                <Option value="Donegal">Donegal</Option>
                <Option value="Down">Down</Option>
                <Option value="Dublin">Dublin</Option>
                <Option value="Fermanagh">Fermanagh</Option>
                <Option value="Galway">Galway</Option>
                <Option value="Kerry">Kerry</Option>
                <Option value="Kildare">Kildare</Option>
                <Option value="Kilkenny">Kilkenny</Option>
                <Option value="Laois">Laois</Option>
                <Option value="Leitrim">Leitrim</Option>
                <Option value="Limerick">Limerick</Option>
                <Option value="Longford">Longford</Option>
                <Option value="Louth">Louth</Option>
                <Option value="Mayo">Mayo</Option>
                <Option value="Meath">Meath</Option>
                <Option value="Monaghan">Monaghan</Option>
                <Option value="Offaly">Offaly</Option>
                <Option value="Roscommon">Roscommon</Option>
                <Option value="Sligo">Sligo</Option>
                <Option value="Tipperary">Tipperary</Option>
                <Option value="Tyrone">Tyrone</Option>
                <Option value="Waterford">Waterford</Option>
                <Option value="Westmeath">Westmeath</Option>
                <Option value="Wexford">Wexford</Option>
                <Option value="Wicklow">Wicklow</Option>
              </Select>
            </FormItem>

            <h2>Section 2 - About Your Work</h2>
            <hr className="divider secondary" />

            <FormItem
              label="You've been nominated as a Changemaker in Ireland. Which organisation/s are you involved in to deliver social change?"
            >
              <Select placeholder="Select an organisation" onChange={this.onSelectOrg}>
                <Option value="Organisation 1" key="Organisation 1">Oranistaion 1</Option>
                <Option value="Organisation 2" key="Organisation 2">Organisation 2</Option>
                <Option value="Organisation 3" key="Organisation 3">Organisation 3</Option>
                <Option value="Organisation 4" key="Organisation 4">Organisation 4</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={`Are you a founder of (${this.state.organisation})?`}
            >
            <RadioGroup>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={`What is your job title in (${this.state.organisation})?`}
            >
            <Input placeholder="Job Title" />

          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`Year ${this.state.organisation} was founded`}
          >
            <InputNumber defaultValue={currentYear} min={1900} max={currentYear} />
          </FormItem>

          <FormItem
            label={`Which of these sectors does (${this.state.organisation}) operate in?`}
          >
            <Select placeholder="Select a sector">
              <Option value="Protecting & Preserving the Planet">Protecting & Preserving the Planet</Option>
              <Option value="Social Inclusion">Social Inclusion</Option>
              <Option value="Physical & Mental Well-being">Physical & Mental Well-being</Option>
              <Option value="Educating & Developing Skills">Educating & Developing Skills</Option>
              <Option value="Human Rights">Human Rights</Option>
            </Select>
          </FormItem>

          <FormItem
            label="(If multi) Which would you say is your primary sector in which you operate?"
          >
            <Select placeholder="Select a sector">
              <Option value="Protecting & Preserving the Planet">Protecting & Preserving the Planet</Option>
              <Option value="Social Inclusion">Social Inclusion</Option>
              <Option value="Physical & Mental Well-being">Physical & Mental Well-being</Option>
              <Option value="Educating & Developing Skills">Educating & Developing Skills</Option>
              <Option value="Human Rights">Human Rights</Option>
            </Select>
          </FormItem>

          <FormItem
            label="How would you describe what you do in short (1-2 sentences)?"
          >
            <Input type="textarea" rows={4} />
          </FormItem>

          <FormItem
            label="Why did you start this work (1-2 sentences) ?"
          >
            <Input type="textarea" rows={4} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Current number of full time paid staff"
          >
            <InputNumber defaultValue="0" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Current number of prestart time paid staff"
          >
            <InputNumber defaultValue="0" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Current number of volunteers (per year)"
          >
            <InputNumber defaultValue="0" />
          </FormItem>

          <FormItem
            label={`Which of these sources of founding does (${this.state.organisation}) have?`}
          >
            <Select placeholder="Select a sector">
              <Option value="Earned Revenue">Earned Revenue</Option>
              <Option value="Public Funding">Public Funding</Option>
              <Option value="Philanthropy">Philanthropy</Option>
            </Select>
          </FormItem>

          <hr className="divider secondary" />

          <Button type="primary"
                  htmlType="submit"
                  onClick={this.submit}
                  size="large">
            Submit
          </Button>
        </Form>

      </div>
    );
  }
}

export default Form.create()(SurveyPage);
