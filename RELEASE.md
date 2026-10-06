# DGBuzzer Release & Deployment Guide

This document describes how to build and release **DGBuzzer** both to **GitHub Releases** (as a downloadable APK) and to the **Google Play Store** (as an App Bundle `.aab`) via GitHub Actions.

---

## 1. Required GitHub Secrets

In your GitHub repository, navigate to **Settings → Secrets and variables → Actions → Repository secrets** and ensure the following secrets are configured:

| Secret Name | Description |
|---|---|
| `KEYSTORE_BASE64` | Base64-encoded release keystore (`dgbuzzer` / `my-upload-key.keystore`) |
| `KEYSTORE_PASSWORD` | Keystore password |
| `KEY_ALIAS` | Key alias (e.g. `dgbuzzer`) |
| `KEY_PASSWORD` | Key password |
| `PLAY_STORE_JSON_KEY` | Service Account JSON key from Google Cloud Console (for Play Store publishing) |

---

## 2. Google Play Store Service Account Setup (One-time)

To allow GitHub Actions to upload releases automatically to Google Play via the API:

### Step 2.1: Enable the API in Google Cloud Console
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Select the Google Cloud project linked to your Google Play Developer Account.
3. Search for **Google Play Android Developer API** and click **Enable**.

### Step 2.2: Create a Service Account
1. In Google Cloud Console, navigate to **IAM & Admin → Service Accounts**.
2. Click **Create Service Account**.
   - **Name**: `github-actions-play-store`
3. Click **Done** to create the service account.

### Step 2.3: Download the JSON Key
1. Click on the newly created service account.
2. Go to the **Keys** tab.
3. Click **Add Key → Create new key**.
4. Select **JSON** and click **Create**. Save the downloaded `.json` file.

### Step 2.4: Grant Permissions in Google Play Console
1. Open the [Google Play Console](https://play.google.com/console).
2. In the left navigation, go to **Developer account → API access**.
3. Under **Service accounts**, find the service account you just created and click **Grant access** (or **Manage permissions**).
4. Under **App permissions**, select `in.darkglance.dgbuzzer`.
5. Under **Account permissions**, ensure the following permissions are checked:
   - **Releases**: *Create, edit, and roll out releases*
   - *Manage testing tracks and edit tester lists*
6. Click **Invite user** / **Apply permissions**.

### Step 2.5: Add Secret to GitHub
1. Open the downloaded `.json` file in a text editor and copy all contents.
2. In your GitHub repo, add a repository secret named **`PLAY_STORE_JSON_KEY`** with the pasted JSON.

---

## 3. Important: Initial Manual Upload (One-time)

> [!IMPORTANT]
> Google Play **does not allow automated API uploads for apps that have never had a release artifact uploaded manually**.
> Before running the automated release workflow to the Play Store:
> 1. Run the **Build APK and AAB** workflow (`build.yml`) once in GitHub Actions.
> 2. Download the generated `dgbuzzer-aab` artifact.
> 3. Go to [Google Play Console](https://play.google.com/console) → `in.darkglance.dgbuzzer` → **Internal testing** (or Closed testing).
> 4. Create a new release and upload the `.aab` manually to initialize your store listing.

Once the initial manual release is accepted, all subsequent releases can be automated completely through GitHub Actions.

---

## 4. How to Create a Release

When you are ready to publish a new version:

1. Open your repository on GitHub.
2. Go to the **Actions** tab.
3. In the left sidebar, click **Build and Release APK & Play Store**.
4. Click the **Run workflow** dropdown on the right.
5. Fill in the parameters:
   - **Release tag**: e.g., `v1.0.2` or `1.0.2` (used for GitHub release title and Android `versionName`).
   - **Version Code**: e.g., `5` (must be an integer and must increase with every Play Store release).
   - **Google Play Track**: Choose `internal`, `alpha`, `beta`, or `production`.
   - **Deploy to Google Play Store**: Checked by default. (Uncheck if you only want to create a GitHub Release).
6. Click **Run workflow**.

### What the workflow does:
1. Checks out the code and sets up Node 20 & JDK 17.
2. Installs dependencies (`npm ci`) and applies the Gradle compatibility patch.
3. Restores and decodes the release keystore.
4. Compiles and signs both the release `.apk` and `.aab` with the provided `versionName` and `versionCode`.
5. Publishes a **GitHub Release** with `dgbuzzer.apk` attached and automatic release notes.
6. Deploys `app-release.aab` directly to the selected track on **Google Play Console** (if enabled).
