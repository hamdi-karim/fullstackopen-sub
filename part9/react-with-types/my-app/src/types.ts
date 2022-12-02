interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}
  
interface CourseAddedDescription extends CoursePartBase {
    description: string;
}
  
interface CourseNormalPart extends CourseAddedDescription {
    type: "normal";
}
  
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
  
interface CourseSubmissionPart extends CourseAddedDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseAddedDescription {
    type: "special";
    requirements: string[];
}
  
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;