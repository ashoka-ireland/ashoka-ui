import React from 'react';
import * as constants from '../../api/constants';
import { UserForm, OrganisationForm } from '../../components';
import * as field from './fields';

export default [
  {
    title: 'Section 1 - About You',
    fields: [
      {
        type: field.CUSTOM,
        customField: (formItemLayout, form) => (
          <UserForm key='user-form' formItemLayout={formItemLayout} form={form} />
        )
      },{
        label: 'Do you work from an office or home?',
        name: constants.PLACE_OF_WORK,
        type: field.SELECT,
        placeholder: 'Select a sector',
        options: [
          { value: 'office', text: 'Office' },
          { value: 'home', text: 'Home' }
        ]
      },{
        label: '(If office) Office Location',
        name: constants.OFFICE_LOCATION,
        type: field.SELECT,
        placeholder: 'Select a sector',
        options: [
          { value: 'Antrim', text: 'Antrim' },
          { value: 'Armagh', text: 'Armagh' },
          { value: 'Carlow', text: 'Carlow' },
          { value: 'Cavan', text: 'Cavan' },
          { value: 'Clare', text: 'Clare' },
          { value: 'Cork', text: 'Cork' },
          { value: 'Derry', text: 'Derry' },
          { value: 'Donegal', text: 'Donegal' },
          { value: 'Down', text: 'Down' },
          { value: 'Dublin', text: 'Dublin' },
          { value: 'Fermanagh', text: 'Fermanagh' },
          { value: 'Galway', text: 'Galway' },
          { value: 'Kerry', text: 'Kerry' },
          { value: 'Kildare', text: 'Kildare' },
          { value: 'Kilkenny', text: 'Kilkenny' },
          { value: 'Laois', text: 'Laois' },
          { value: 'Leitrim', text: 'Leitrim' },
          { value: 'Limerick', text: 'Limerick' },
          { value: 'Longford', text: 'Longford' },
          { value: 'Louth', text: 'Louth' },
          { value: 'Mayo', text: 'Mayo' },
          { value: 'Meath', text: 'Meath' },
          { value: 'Monaghan', text: 'Monaghan' },
          { value: 'Offaly', text: 'Offaly' },
          { value: 'Roscommon', text: 'Roscommon' },
          { value: 'Sligo', text: 'Sligo' },
          { value: 'Tipperary', text: 'Tipperary' },
          { value: 'Tyrone', text: 'Tyrone' },
          { value: 'Waterford', text: 'Waterford' },
          { value: 'Westmeath', text: 'Westmeath' },
          { value: 'Wexford', text: 'Wexford' },
          { value: 'Wicklow', text: 'Wicklow' }
        ]
      }
    ]
  },
  {
    title: 'Section 2 - About Your Work',
    fields: [
      {
        type: field.CUSTOM,
        customField: (formItemLayout, form) => (
          <OrganisationForm key='org-form' formItemLayout={formItemLayout} form={form} />
        )
      },{
        longLabel: '(If multi) Which would you say is your primary sector in which you operate?',
        name: constants.ORGANISATION_SECTOR,
        type: field.SELECT,
        placeholder: 'Select a sector',
        options: [
          { value: 'Protecting & Preserving the Planet', text: 'Protecting & Preserving the Planet' },
          { value: 'Social Inclusion', text: 'Social Inclusion' },
          { value: 'Physical & Mental Well-being', text: 'Physical & Mental Well-being' },
          { value: 'Educating & Developing Skills', text: 'Educating & Developing Skills' },
          { value: 'Human Rights', text: 'Human Rights' }
        ]
      },{
        longLabel: 'How would you describe what you do in short (1-2 sentences)?',
        name: constants.DUTIES,
        type: field.TEXT_AREA,
        rows: 4
      },{
        longLabel: 'Why did you start this work (1-2 sentences)?',
        name: constants.REASON_FOR_FIELD_OF_WORK,
        type: field.TEXT_AREA,
        rows: 4
      },{
        label: 'Current number of full time paid staff',
        name: constants.NUM_FULL_TIME_STAFF,
        type: field.NUMBER,
        initialValue: 0
      },{
        label: 'Current number of part time paid staff',
        name: constants.NUM_PART_TIME_STAFF,
        type: field.NUMBER,
        initialValue: 0
      },{
        label: 'Current number of volunteers (per year)',
        name: constants.NUM_VOLUNTEERS,
        type: field.NUMBER,
        initialValue: 0
      },{
        longLabel: '(If applicable) How much earned revenue in the most recent financial year?',
        label: 'Exact Figure',
        name: constants.REVENUE_EXACT,
        type: field.TEXT,
        placeholder: 'Revenue Earned',
        addonBefore: '€'
      },{
        label: 'Estimate Figure',
        name: constants.REVENUE_ESTIMATED,
        type: field.SELECT,
        placeholder: 'Revenue Earned',
        options: [
          { value: 'None', text: 'None' },
          { value: '0-10k', text: '0-10k' },
          { value: '10-25k', text: '10-25k' },
          { value: '25-50k', text: '25-50k' },
          { value: '50-75k', text: '50-75k' },
          { value: '75-100k', text: '75-100k' },
          { value: '100-250k', text: '100-250k' },
          { value: '250-500k', text: '250-500k' },
          { value: '500-1M', text: '500-1M' },
          { value: '1M+', text: '1M+' }
        ]
      },{
        longLabel: '(If applicable) How much public funding in the most recent financial year?',
        label: 'Exact Figure',
        name: constants.PUBLIC_FUNDING_EXACT,
        type: field.TEXT,
        placeholder: 'Revenue Earned',
        addonBefore: '€'
      },{
        label: 'Estimate Figure',
        name: constants.PUBLIC_FUNDING_ESTIMATED,
        type: field.SELECT,
        placeholder: 'Revenue Earned',
        options: [
          { value: 'None', text: 'None' },
          { value: '0-10k', text: '0-10k' },
          { value: '10-25k', text: '10-25k' },
          { value: '25-50k', text: '25-50k' },
          { value: '50-75k', text: '50-75k' },
          { value: '75-100k', text: '75-100k' },
          { value: '100-250k', text: '100-250k' },
          { value: '250-500k', text: '250-500k' },
          { value: '500-1M', text: '500-1M' },
          { value: '1M+', text: '1M+' }
        ]
      },{
        longLabel: '(If applicable) How much Philanthropy in the most recent financial year?',
        label: 'Exact Figure',
        name: constants.PHILANTHROPY_EXACT,
        type: field.TEXT,
        placeholder: 'Revenue Earned',
        addonBefore: '€'
      },{
        label: 'Estimate Figure',
        name: constants.PHILANTHROPY_ESTIMATED,
        type: field.SELECT,
        placeholder: 'Revenue Earned',
        options: [
          { value: 'None', text: 'None' },
          { value: '0-10k', text: '0-10k' },
          { value: '10-25k', text: '10-25k' },
          { value: '25-50k', text: '25-50k' },
          { value: '50-75k', text: '50-75k' },
          { value: '75-100k', text: '75-100k' },
          { value: '100-250k', text: '100-250k' },
          { value: '250-500k', text: '250-500k' },
          { value: '500-1M', text: '500-1M' },
          { value: '1M+', text: '1M+' }
        ]
      },{
        longLabel: 'In which counties is your work having a positive impact?',
        label: 'Counties',
        name: constants.EFFECTIVE_COUNTIES,
        type: field.SELECT,
        placeholder: 'Select counties',
        additionalNotes: 'Interviewer Prompt: Are the counties in which the work is having a positive impact on the lives of people? Enter notes here if needed...',
        options: [
          { value: 'Antrim', text: 'Antrim' },
          { value: 'Armagh', text: 'Armagh' },
          { value: 'Carlow', text: 'Carlow' },
          { value: 'Cavan', text: 'Cavan' },
          { value: 'Clare', text: 'Clare' },
          { value: 'Cork', text: 'Cork' },
          { value: 'Derry', text: 'Derry' },
          { value: 'Donegal', text: 'Donegal' },
          { value: 'Down', text: 'Down' },
          { value: 'Dublin', text: 'Dublin' },
          { value: 'Fermanagh', text: 'Fermanagh' },
          { value: 'Galway', text: 'Galway' },
          { value: 'Kerry', text: 'Kerry' },
          { value: 'Kildare', text: 'Kildare' },
          { value: 'Kilkenny', text: 'Kilkenny' },
          { value: 'Laois', text: 'Laois' },
          { value: 'Leitrim', text: 'Leitrim' },
          { value: 'Limerick', text: 'Limerick' },
          { value: 'Longford', text: 'Longford' },
          { value: 'Louth', text: 'Louth' },
          { value: 'Mayo', text: 'Mayo' },
          { value: 'Meath', text: 'Meath' },
          { value: 'Monaghan', text: 'Monaghan' },
          { value: 'Offaly', text: 'Offaly' },
          { value: 'Roscommon', text: 'Roscommon' },
          { value: 'Sligo', text: 'Sligo' },
          { value: 'Tipperary', text: 'Tipperary' },
          { value: 'Tyrone', text: 'Tyrone' },
          { value: 'Waterford', text: 'Waterford' },
          { value: 'Westmeath', text: 'Westmeath' },
          { value: 'Wexford', text: 'Wexford' },
          { value: 'Wicklow', text: 'Wicklow' }
        ]
      },{
        longLabel: '(If direct service) Number of people directly impacted per year?',
        name: constants.NUM_PEOPLE_IMPACTED,
        type: field.NUMBER,
        initialValue: 0
      },{
        longLabel: 'Are you a registered entity?',
        name: constants.REGISTERED_ENTITY,
        type: field.RADIO,
        additionalNotes: 'Interviewer Prompt: In ROI it will be Companies Registration Office (CRO), or in NI the Companies House. Enter notes here if needed...',
        options: [
          { value: 'yes', text: 'Yes' },
          { value: 'no', text: 'No' }
        ]
      },{
        longLabel: 'If yes, are you registered as?',
        name: constants.REGISTERED_AS,
        type: field.SELECT,
        placeholder: 'Select a type',
        options: [
          { value: 'A charity', text: 'A charity: your organisation is a Non-Profit and is registered with the Company\'s Regulatory Authority (CRA) and has CHY number. If in Northern Ireland (the equivalent)' },
          { value: 'A business', text: 'A business: Your organisation is a For-Profit and is a company limited by guarantee with share capital. ' },
          { value: 'A social enterprise', text: 'A social enterprise - Your organisation derives some level of its own revenue through its activities but all revenue earned is ring fenced for uses to achieve its social mission and increase it’s impact. Your organisation is a company limited by guarantee without share capital' }
        ]
      },{
        longLabel: 'What do you see as the greatest barriers to increasing your impact?',
        name: constants.GREATEST_BARRIERS,
        type: field.SELECT,
        placeholder: 'Select a type',
        options: [
          { value: 'Access to finance', text: 'Access to finance: philanthropy and/or opportunities to raise capital through debt or equity finance.' },
          { value: 'Access to talent', text: 'Access to talent: available and affordable talent with the appropriate skills and experience.' },
          { value: 'Current Systems', text: 'Current Systems: flaws that exist within the current systems.' },
          { value: 'Policy & Legislation', text: 'Policy & Legislation: Government policy and Irish law' },
          { value: 'Public mindset', text: 'Public mindset: How people at a wide scale view a problem' },
          { value: 'None of the above', text: 'None of the above' }
        ]
      },{
        longLabel: 'What do you see as the single greatest barrier to increasing your impact?',
        name: constants.GREATEST_BARRIER,
        type: field.SELECT,
        placeholder: 'Select a type',
        additionalNotes: 'Additional notes here if needed...',
        options: [
          { value: 'Access to finance', text: 'Access to finance: philanthropy and/or opportunities to raise capital through debt or equity finance.' },
          { value: 'Access to talent', text: 'Access to talent: available and affordable talent with the appropriate skills and experience.' },
          { value: 'Current Systems', text: 'Current Systems: flaws that exist within the current systems.' },
          { value: 'Policy & Legislation', text: 'Policy & Legislation: Government policy and Irish law' },
          { value: 'Public mindset', text: 'Public mindset: How people at a wide scale view a problem' },
          { value: 'None of the above', text: 'None of the above' }
        ]
      },{
        longLabel: 'Do you want to be kept up to date with publication of results of the mapping and events in relation to it?',
        name: constants.KEPT_UP_TO_DATE,
        type: field.RADIO,
        additionalNotes: 'Interviewer Prompt: In ROI it will be Companies Registration Office (CRO), or in NI the Companies House. Enter notes here if needed...',
        options: [
          { value: 'yes', text: 'Yes' },
          { value: 'no', text: 'No' }
        ]
      }
    ]
  }
];
