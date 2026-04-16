import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = () => {
  const dispatch = useDispatch();
  const storeUser = useSelector((store) => store.user?.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!storeUser) return;
    setFirstName(storeUser.firstName || "");
    setLastName(storeUser.lastName || "");
    setPhotoUrl(storeUser.photoUrl || "");
    setAge(storeUser.age ?? "");
    setGender(storeUser.gender || "");
    setLocation(storeUser.location || "");
    setSkillsText((storeUser.skills || []).join(", "));
    setAbout(storeUser.about || "");
  }, [storeUser]);

  const previewUser = useMemo(
    () => ({
      ...storeUser,
      firstName,
      lastName,
      photoUrl,
      age: age === "" ? undefined : Number(age),
      gender,
      location,
      about,
      skills: skillsText
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    }),
    [storeUser, firstName, lastName, photoUrl, age, gender, location, about, skillsText]
  );

  const saveProfile = async () => {
    try {
      const payload = {};
      if (photoUrl.trim()) payload.photoUrl = photoUrl.trim();
      if (age !== "") payload.age = Number(age);
      if (gender) payload.gender = gender;
      payload.location = location.trim();
      payload.skills = skillsText
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
      payload.about = about;

      const response = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });
      dispatch(addUser(response.data?.data || response.data));
      setStatus("Profile updated successfully.");
    } catch (err) {
      setStatus(err?.response?.data || "Failed to update profile.");
    }
  };

  return (
    <div className="profile-page w-full min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <div className="card profile-editor-card shadow-xl">
          <div className="card-body p-6 md:p-8">
            <h2 className="card-title text-3xl profile-title mb-2">Edit Profile</h2>
            <p className="profile-subtitle mb-5">Update your details and preview how your profile appears in feed.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label"><span className="label-text profile-label">First name</span></div>
                <input
                  type="text"
                  value={firstName}
                  readOnly
                  className="input input-bordered profile-input profile-input-readonly cursor-not-allowed"
                />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text profile-label">Last name</span></div>
                <input
                  type="text"
                  value={lastName}
                  readOnly
                  className="input input-bordered profile-input profile-input-readonly cursor-not-allowed"
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label"><span className="label-text profile-label">Photo URL</span></div>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full profile-input"
                placeholder="https://..."
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="form-control w-full">
                <div className="label"><span className="label-text profile-label">Age</span></div>
                <input
                  type="number"
                  min="18"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full profile-input"
                  placeholder="Age"
                />
              </label>

              <label className="form-control w-full">
                <div className="label"><span className="label-text profile-label">Gender</span></div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full profile-input"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label"><span className="label-text profile-label">Location</span></div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input input-bordered w-full profile-input"
                  placeholder="City, Country"
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label"><span className="label-text profile-label">Skills (comma separated)</span></div>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className="input input-bordered w-full profile-input"
                placeholder="React, Node.js, MongoDB"
              />
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text profile-label">About</span></div>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered min-h-44 w-full resize-y profile-input"
                placeholder="Tell others about yourself..."
              />
            </label>

            <div className="card-actions justify-end mt-2">
              <button className="btn profile-save-btn" onClick={saveProfile}>Save Profile</button>
            </div>
            {status ? <p className="text-sm mt-2 profile-status">{status}</p> : null}
          </div>
        </div>

     
          <div className="card-body p-6 -my-10">
            <div className="mt-3 profile-preview-frame">
              <UserCard user={previewUser} showActions={false} className="profile-preview-user-card" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default EditProfile;
