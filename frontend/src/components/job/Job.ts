export namespace JobHelper {
  export function getNew(): Job {
    let blank: JobRs = {
      id: undefined,
      position: "",
      join_date: "2019-12-11T00:00:00.000Z",
      quit_date: "2019-12-11T00:00:00.000Z",
      description: "",
      technologies: "",
      company: "",
      company_url: "",
      exp: "",
      user_id: undefined,
      created_at: undefined,
      updated_at: undefined
    };
    return new Job(blank);
  }

  export function fromRespArr(respArr: JobRs[]): Job[] {
    let jobsArr: Job[] = [];
    respArr.forEach(jobRs => {
      jobsArr.push(new Job(jobRs));
    });
    return jobsArr;
  }
}

export interface JobRs {
  id: number | string | undefined;
  join_date: string;
  quit_date: string;
  position: string;
  company: string;
  company_url: string;
  description: string;
  exp: string;
  technologies: string;
  user_id: number | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;
}

export class Job {
  id: number | string | undefined;
  position: string;
  join_date: Date;
  quit_date: Date;
  description: string;
  technologies: string;
  company: string;
  company_url: string;
  exp: string;
  user_id: number | undefined;

  constructor(job: JobRs) {
    if (job.id) this.id = job.id;
    this.position = job.position;
    this.join_date = new Date(Date.parse(job.join_date));
    this.quit_date = new Date(Date.parse(job.quit_date));
    this.description = job.description;
    this.technologies = job.technologies;
    this.company = job.company;
    this.company_url = job.company_url;
    this.exp = job.exp;
  }

  set_position(position: string) {
    this.position = position;
  }
  set_join_date(join_date: Date) {
    this.join_date = join_date;
  }
  set_quit_date(quit_date: Date) {
    this.quit_date = quit_date;
  }
  set_description(description: string) {
    this.description = description;
  }
  set_technologies(technologies: string) {
    this.technologies = technologies;
  }
  set_company(company: string) {
    this.company = company;
  }
  set_company_url(company_url: string) {
    this.company_url = company_url;
  }
  set_exp(exp: string) {
    this.exp = exp;
  }
}
