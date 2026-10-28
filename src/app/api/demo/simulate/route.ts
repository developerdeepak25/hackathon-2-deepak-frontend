/**
 * Server proxy for the test-company simulation so JOB_SECRET stays off the browser.
 */

import axios from "axios";
import { NextResponse } from "next/server";
import { toApiError } from "@/lib/api/client";

export async function POST() {
  const secret = process.env.JOB_SECRET;
  const base = (
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:4000/api"
  ).replace(/\/$/, "");

  if (!secret) {
    return NextResponse.json(
      {
        message:
          "Demo checks need JOB_SECRET in policyhawk-web/.env, matching the API, and a restart of the Next server.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await axios.post(
      `${base}/companies/test-company/simulate-change`,
      null,
      {
        headers: { "x-job-secret": secret, Accept: "application/json" },
        timeout: 120_000,
      },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    const apiError = toApiError(error);
    const status = axios.isAxiosError(error) ? error.response?.status ?? 502 : 502;
    return NextResponse.json({ message: apiError.message }, { status });
  }
}
