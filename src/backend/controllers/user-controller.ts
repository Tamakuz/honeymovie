import dbConnection from "../utils/db-connection";
import User from "../models/user-model";
import { NextResponse } from "next/server";

type UserProps = {
  email: string | null | undefined;
  name: string | null | undefined;
  provider: string | null | undefined;
};

export const createUser = async ({ email, name, provider }: UserProps) => {
  await dbConnection();

  try {
    const existUser = await User.findOne({ email, provider });

    if (existUser) {
      return NextResponse.json(
        { success: false, data: "User already exists" },
        { status: 200 }
      );
    }

    // Membuat pengguna baru dengan menggunakan bidang provider
    const user = await User.create({ email, name, provider });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
