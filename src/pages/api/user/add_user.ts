import User from '@/models/User';
import { AddUserRequest } from '@/types/user_route.types';
import startSection, { endSection } from '@/utility/logToTerminal';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  startSection('ADD USER');
  console.log('REQ BODY: ', req.body);

  try {
    const {
      user_first_name,
      user_last_name,
      user_birthday,
      user_email,
      user_contact_number,
      user_country,
      user_state,
      user_city,
      user_postal_code,
      user_address,
    } = JSON.parse(req.body) as AddUserRequest;

    const user = new User(
      user_first_name,
      user_last_name,
      user_birthday,
      user_email,
      user_contact_number,
      user_country,
      user_state,
      user_city,
      user_postal_code,
      user_address
    );

    const userProfileSaveResult = await user.pushToDataBase();
    console.log(userProfileSaveResult);
    res.json({ message: '[+] USER PROFILE CREATED SUCCESSFULLY...' });
  } catch (error) {
    console.log('[-] COULD NOT CREATE NEW USER...');
    console.log(error, '\n');
    res.json({ message: '[-] COULD NOT CREATE YOUR PROFILE...' });
  }

  endSection();
}
