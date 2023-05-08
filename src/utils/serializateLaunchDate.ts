const serializateLaunchDate = <T extends { launchDate: string }>(obj: T) => {
  return { ...obj, launchDate: new Date(obj.launchDate) };
};

export default serializateLaunchDate;
