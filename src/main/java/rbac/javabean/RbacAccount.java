package rbac.javabean;

import java.util.ArrayList;

public class RbacAccount {
	private int default_roleid;

	public int getDefault_roleid() {
		return default_roleid;
	}

	public void setDefault_roleid(int default_roleid) {
		this.default_roleid = default_roleid;
	}

	private String fullname;
	private int departmentId;
	
	private ArrayList<Integer> role;

	public RbacAccount() {
	}

	public ArrayList<Integer> getRole() {
		return role;
	}

	public void setRole(ArrayList<Integer> role) {
		this.role = role;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

}
